<script lang="ts">
	import { base } from '$app/paths';
</script>

<header class="min-w-full p-4 md:p-8">
	<nav class="flex justify-around">
		<a href="{base}/" class="logo">CodeJournal</a>
		<ul class="flex gap-4">
			<li class="mr-2 hidden hover:underline md:block">
				<a href="{base}/">Home</a>
			</li>
			<li class="mr-2 hover:underline"><a href="{base}/learn-javascript">Javascript</a></li>
			<li class="mr-2 hover:underline"><a href="{base}/learn-html">HTML</a></li>
			<li class="mr-2 hover:underline"><a href="{base}/learn-css">CSS</a></li>
			<li class="mr-2 hover:underline"><a href="{base}/blog">Blog </a></li>
		</ul>
	</nav>
</header>
