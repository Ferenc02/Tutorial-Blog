<script lang="ts">
	import { page } from '$app/state';

	import { blogs } from '$lib/blogs.json';

	import { onMount } from 'svelte';

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

		let newText = blog.content.replace(/\\n/g, '<br>');

		// Not the best way to do this since this will make the content vulnerable to XSS attacks
		content.innerHTML = newText;
	});
</script>

<article class="mx-auto my-8 flex w-3/4 flex-col gap-4 lg:w-1/2">
	{#if isAdmin}
		<a
			href={`/blog/${blog.title}/edit`}
			class="flex w-32 cursor-pointer justify-center self-end rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
			>Edit</a
		>
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
