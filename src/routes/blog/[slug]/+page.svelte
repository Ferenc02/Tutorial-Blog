<script lang="ts">
	import { page } from '$app/state';

	import { blogs } from '$lib/blogs.json';

	import { onMount } from 'svelte';
	import DOMPurify from 'dompurify';

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
		'h3'
	];
	let allowedAttributes = ['href', 'title', 'src', 'alt', 'class', 'style'];

	let blogsName = blogs.map((blog) => blog.title);

	let blog = blogs.find((blog) => blog.title === page.params.slug)!;

	// let { isAdmin } = $props();

	let props = $props();

	let isAdmin = props.data.isAdmin;

	let content: HTMLElement;

	onMount(async () => {
		if (!blogsName.includes(page.params.slug)) {
			location.pathname = '/blog';
		}

		let sanitizedContent = DOMPurify.sanitize(blog.content, {
			ALLOWED_TAGS: allowedTags,
			ALLOWED_ATTR: allowedAttributes
		});

		content.innerHTML = sanitizedContent;
	});

	let deleteBlog = async () => {
		let confirmation = confirm('Are you sure you want to delete this blog?');

		if (confirmation) {
			const res = await fetch('/api/delete-blog', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title: blog.title })
			});

			const data = await res.json();
			if (data.success) {
				location.pathname = '/blog';
			} else {
				alert('Error deleting blog');
			}
		}
	};
</script>

<article class="mx-auto my-8 flex w-3/4 flex-col gap-4 lg:w-1/2">
	{#if isAdmin}
		<div class="flex justify-end gap-4">
			<a
				href={`/blog/${blog.title}/edit`}
				class="flex w-32 cursor-pointer justify-center self-end rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
				>Edit</a
			>
			<button
				onclick={deleteBlog}
				class="flex w-32 cursor-pointer justify-center self-end rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-red-800"
				>Delete</button
			>
		</div>
	{/if}

	<h1 class="text-center text-3xl font-bold">{blog.title}</h1>
	<span class="flex justify-center text-gray-500 dark:text-gray-300">{blog.date}</span>
	<div class="relative">
		<img
			src={blog.image}
			alt="Post preview"
			class="h-96 w-full rounded-lg object-cover shadow-md"
		/>
		<span
			class="absolute top-0 right-0 rounded-bl-lg bg-white p-2 text-black dark:bg-neutral-700 dark:text-white"
			>{blog.category}</span
		>
		<span class="mt-2 flex justify-center text-gray-500 italic dark:text-gray-300"
			>{blog.imageCaption}</span
		>
	</div>

	<p class="text-left text-lg text-gray-700 dark:text-gray-300" bind:this={content}>
		{blog.content}
	</p>
</article>
