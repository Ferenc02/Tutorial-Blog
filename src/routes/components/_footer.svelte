<script lang="ts">
	import ThemeSwitcher from '../components/_theme_switcher.svelte';
</script>

<footer class="flex w-full items-center justify-between self-end p-2 align-middle">
	<a class="bmc-container" href="#0" target="_blank">
		<img src="/bmc-button.svg" alt="Buy me a coffee button" class="w-32" />
	</a>
	<p class="w-32 text-center">&copy; 2025 Ferenc</p>
	<ThemeSwitcher />
</footer>
