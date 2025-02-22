<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	import { blogs } from '$lib/blogs.json';

	let blog = blogs.find((blog) => blog.title === page.params.slug)!;

	let updatedBlog = { ...blog };

	async function saveBlog() {
		const res = await fetch('/api/update-blog', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: blog.title, updatedBlog })
		});

		const data = await res.json();
		if (data.success) {
			alert('Blog saved successfully!');
			location.pathname = `/blog/${updatedBlog.title}`;
		} else {
			alert('Error saving blog');
		}
	}

	onMount(() => {
		// Logic to handle mounting if needed
	});
</script>

<article class="mx-auto my-8 flex w-3/4 flex-col gap-4 lg:w-1/2">
	<button
		onclick={saveBlog}
		class="flex w-32 cursor-pointer justify-center self-end rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
	>
		Save
	</button>

	<h1 class="text-center text-3xl font-bold">
		<input
			type="text"
			bind:value={updatedBlog.title}
			class="w-full rounded-lg border-2 border-gray-300 p-2 text-center text-3xl font-bold"
		/>
	</h1>
	<span class="flex justify-center text-gray-500 dark:text-gray-300">{blog.date}</span>

	<div class="relative">
		<input
			type="text"
			bind:value={updatedBlog.image}
			class="h-96 w-full rounded-lg object-cover shadow-md"
		/>
		<span
			class="absolute top-0 right-0 rounded-bl-lg bg-white p-2 text-black dark:bg-neutral-700 dark:text-white"
		>
			{updatedBlog.category}
		</span>
		<span class="mt-2 flex justify-center text-gray-500 italic dark:text-gray-300">
			{updatedBlog.imageCaption}
		</span>
	</div>

	<textarea
		bind:value={updatedBlog.content}
		class="h-48 w-full rounded-lg border-2 border-gray-300 p-2 text-left text-lg text-gray-700 dark:text-gray-300"
	/>
</article>
