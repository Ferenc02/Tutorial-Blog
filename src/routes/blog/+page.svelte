<script lang="ts">
	import PostPreview from '../components/_postPreview.svelte';

	import { blogs } from '$lib/blogs.json';
</script>

<h1 class="mb-8 text-center text-4xl font-extrabold">Here are the latest blog posts</h1>

<section class="content-center gap-6 px-6 py-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:px-32">
	{#each blogs as blog}
		<PostPreview {...blog} />
	{/each}
</section>
