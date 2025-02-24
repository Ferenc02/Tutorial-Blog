<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';

	import { onMount } from 'svelte';
	import DOMPurify from 'dompurify';

	import 'highlight.js/styles/atom-one-dark.css'; // Import a theme
	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';
	import xml from 'svelte-highlight/languages/xml';
	import Seo from '../../components/_seo.svelte';

	let props = $props();
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
		'h4',
		'div'
	];
	let allowedAttributes = ['href', 'title', 'src', 'alt', 'class', 'style', 'id', 'target'];

	let blog = props.data.blog;

	// let { isAdmin } = $props();

	let isAdmin = props.data.isAdmin;

	let blogContent: HTMLElement[] = [];

	onMount(async () => {
		// if (!blogsName.includes(page.params.slug)) {
		// 	location.pathname = '/blog';
		// }

		for (let i = 0; i < blog.content.length; i++) {
			let contentToSanitize = '';

			let sanitize = true;
			if (blog.content[i].type === 'image') {
				contentToSanitize = `
				<img src="${blog.content[i].text}" alt="${blog.content[i].caption}" class="w-full rounded-lg object-cover shadow-md" />
				<p class="mt-2 flex justify-center text-gray-500 italic dark:text-gray-300 text-sm">${blog.content[i].caption}</p>
	
				`;
			} else if (blog.content[i].type === 'text') {
				contentToSanitize = `${blog.content[i].text}`;
			} else if (blog.content[i].type === 'code') {
				sanitize = false;
				contentToSanitize = '';
			}

			let sanitizedContent = DOMPurify.sanitize(contentToSanitize, {
				ALLOWED_TAGS: allowedTags,
				ALLOWED_ATTR: allowedAttributes
			});

			if (!sanitize) {
				sanitizedContent = contentToSanitize;
			}

			blogContent[i].innerHTML += sanitizedContent;
		}
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

<Seo title={blog.title} description={blog.content[0].text} image={blog.image} />

<article class="mx-auto my-8 flex flex-col gap-4 p-4 lg:w-1/2" in:fade={{ duration: 250 }}>
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
		<p class="mt-2 flex justify-center text-sm text-gray-500 italic dark:text-gray-300">
			{blog.imageCaption}
		</p>
	</div>

	<div class="flex flex-col gap-4 text-left text-lg text-gray-700 dark:text-gray-300">
		{#each blog.content as content, i}
			<div class="flex flex-col gap-4">
				{#if content.type === 'text'}
					<p
						class="text-left text-lg text-gray-700 dark:text-gray-300"
						bind:this={blogContent[i]}
					></p>
				{:else if content.type === 'image'}
					<div class="relative" bind:this={blogContent[i]}></div>
				{:else if content.type === 'code'}
					<div class="code-container" bind:this={blogContent[i]}>
						<Highlight language={xml} code={content.text} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</article>
