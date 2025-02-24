<script lang="ts">
	import { fade } from 'svelte/transition';
	import PostPreview from '../components/_postPreview.svelte';
	import Seo from '../components/_seo.svelte';

	let props = $props();

	let isAdmin = props.data.isAdmin;

	let blogs = props.data.blogs;

	const newPost = async () => {
		const res = await fetch('/api/create-blog', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: 'New Post' })
		});

		let data = await res.json();
		if (data) {
			location.pathname = `/blog/${data.title}/edit`;
		} else {
			alert('Error creating new post');
		}
	};
</script>

<Seo title="Blog" description="Read the latest blog posts" />

<h1 class="mb-8 text-center text-4xl font-extrabold">Here are the latest blog posts</h1>

{#await blogs}
	<p class="text-center text-lg">Loading...</p>
{:then blogs}
	{#if isAdmin}
		<button
			onclick={newPost}
			class="flex w-32 cursor-pointer justify-center self-end rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
			>New Post</button
		>
	{/if}

	{#if blogs.length === 0}
		<p class="text-center text-lg">No blog posts available</p>
	{/if}
	<section
		class="flex flex-col content-center gap-6 px-6 py-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-32"
		in:fade={{ duration: 250 }}
	>
		{#each blogs as blog}
			<PostPreview {...blog} />
		{/each}
	</section>
{/await}
