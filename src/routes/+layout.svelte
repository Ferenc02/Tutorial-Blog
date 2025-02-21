<script lang="ts">
	import '../app.css';
	import Footer from './components/_footer.svelte';
	import Header from './components/_header.svelte';
	let { children } = $props();
</script>

<Header />
<main class="flex min-w-full flex-grow flex-col p-2 shadow-xs md:p-4">
	{@render children()}
</main>

<Footer />
