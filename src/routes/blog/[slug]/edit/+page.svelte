<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { blogs } from '$lib/blogs.json';

	let allowedTags = [
		'b',
		'strong',
		'i',
		'em',
		'br',
		'p',
		'ul',
		'ol',
		'li',
		'a',
		'img',
		'h1',
		'h2',
		'h3',
		'div'
	];
	let allowedAttributes = ['href', 'title', 'src', 'alt', 'class', 'style'];

	import DOMPurify from 'dompurify';

	let blog = blogs.find((blog) => blog.title === page.params.slug)!;

	let updatedBlog = { ...blog };

	let blogContent: HTMLElement[] = [];

	async function saveBlog() {
		const res = await fetch('/api/update-blog', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: blog.title, updatedBlog })
		});

		const data = await res.json();
		if (data.success) {
			location.pathname = `/blog/${updatedBlog.title}`;
		} else {
			alert('Error saving blog');
		}
	}

	onMount(async () => {
		updateContent();

		document.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === 's') {
				e.preventDefault();
				saveBlog();
			}
		});
	});

	const updateContent = () => {
		console.log('?');

		for (let i = 0; i < updatedBlog.content.length; i++) {
			blogContent[i].innerHTML = '';
			let contentToSanitize = '';
			if (updatedBlog.content[i].type === 'image') {
				contentToSanitize = `
				<div class="relative">
				<img src="${updatedBlog.content[i].text}" alt="${updatedBlog.content[i].caption}" class="w-full rounded-lg object-cover shadow-md" />
				<p class="mt-2 flex justify-center text-gray-500 italic dark:text-gray-300 text-sm">${updatedBlog.content[i].caption}</p>
				</div>
				`;
			} else if (updatedBlog.content[i].type === 'text') {
				contentToSanitize = `<p>${updatedBlog.content[i].text}</p>`;
			}

			let sanitizedContent = DOMPurify.sanitize(contentToSanitize, {
				ALLOWED_TAGS: allowedTags,
				ALLOWED_ATTR: allowedAttributes
			});

			blogContent[i].innerHTML += sanitizedContent;
		}
	};
</script>

<article class="mx-auto my-8 flex w-full flex-col gap-4 px-8">
	<div class="buttons flex justify-end gap-2">
		<button
			onclick={saveBlog}
			class="flex w-32 cursor-pointer justify-center self-end rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
		>
			Save
		</button>
	</div>

	<div class="flex w-full flex-col gap-8 lg:flex-row">
		<div class="edit-container flex w-full flex-col gap-4 lg:w-1/2">
			<span class="text-center text-3xl font-bold">
				<input
					type="text"
					bind:value={updatedBlog.title}
					class="w-full rounded-lg border-2 border-gray-300 p-2 text-center text-3xl font-bold"
				/>
			</span>
			<span class="flex justify-center text-gray-500 dark:text-gray-300">
				<input
					type="text"
					bind:value={updatedBlog.date}
					class="w-full rounded-lg border-2 border-gray-300 p-2 text-center text-lg text-gray-500 dark:text-gray-300"
				/>
			</span>

			<div class="relative">
				<input
					type="text"
					bind:value={updatedBlog.image}
					class="h-96 w-full rounded-lg object-cover shadow-md"
				/>
				<span
					class="absolute top-0 right-0 rounded-bl-lg bg-white p-2 text-black dark:bg-neutral-700 dark:text-white"
				>
					<input
						type="text"
						bind:value={updatedBlog.category}
						class="w-full rounded-lg border-2 border-gray-300 p-2 text-center text-lg text-gray-700 dark:text-gray-300"
					/>
				</span>
				<span class="mt-2 flex justify-center text-gray-500 italic dark:text-gray-300">
					<input
						type="text"
						bind:value={updatedBlog.imageCaption}
						class="w-full rounded-lg border-2 border-gray-300 p-2 text-center text-lg text-gray-700 dark:text-gray-300"
					/>
				</span>
			</div>

			<div class="content-container flex flex-col gap-4">
				{#each updatedBlog.content as content, i}
					{#if content.type === 'text'}
						<textarea
							bind:value={updatedBlog.content[i].text}
							oninput={updateContent}
							class="h-48 w-full rounded-lg border-2 border-gray-300 p-2 text-lg text-gray-700 dark:text-gray-300"
						></textarea>
					{:else if content.type === 'image'}
						<div class="relative">
							<input
								type="text"
								bind:value={updatedBlog.content[i].text}
								oninput={updateContent}
								class="h-96 w-full rounded-lg object-cover shadow-md"
							/>

							<span class="mt-2 flex justify-center text-gray-500 italic dark:text-gray-300">
								<input
									type="text"
									bind:value={updatedBlog.content[i].caption}
									oninput={updateContent}
									class="w-full rounded-lg border-2 border-gray-300 p-2 text-center text-lg text-gray-700 dark:text-gray-300"
								/>
							</span>
						</div>
					{/if}
					<hr class="border-gray-300 dark:border-gray-700" />
				{/each}
			</div>
		</div>
		<div class="preview-container flex w-full flex-col gap-4 lg:w-1/2">
			<h1 class="text-center text-3xl font-bold">{updatedBlog.title}</h1>
			<span class="flex justify-center text-gray-500 dark:text-gray-300">{updatedBlog.date}</span>
			<div class="relative">
				<img
					src={updatedBlog.image}
					alt="Post preview"
					class="h-96 w-full rounded-lg object-cover shadow-md"
				/>
				<span
					class="absolute top-0 right-0 rounded-bl-lg bg-white p-2 text-black dark:bg-neutral-700 dark:text-white"
					>{updatedBlog.category}</span
				>
				<span class="mt-2 flex justify-center text-gray-500 italic dark:text-gray-300"
					>{updatedBlog.imageCaption}</span
				>
			</div>

			{#each updatedBlog.content as content, i}
				<div class="flex flex-col gap-4">
					{#if content.type === 'text'}
						<p
							class="text-left text-lg text-gray-700 dark:text-gray-300"
							bind:this={blogContent[i]}
						>
							{content.text}
						</p>
					{:else if content.type === 'image'}
						<div class="relative" bind:this={blogContent[i]}>
							<img
								src={content.text}
								alt={content.caption}
								class="h-96 w-full rounded-lg object-cover shadow-md"
							/>
							<p class="mt-2 flex justify-center text-sm text-gray-500 italic dark:text-gray-300">
								{content.caption}
							</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</article>
