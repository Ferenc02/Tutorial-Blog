<script lang="ts">
	import ThemeSwitcher from '../components/_theme_switcher.svelte';
</script>

<footer class="flex w-full items-center justify-between self-end p-2 align-middle">
	<div class="flex items-center justify-center space-x-4">
		<a class="bmc-container" href="https://buymeacoffee.com/ferenc02" target="_blank">
			<img src="/bmc-button.svg" alt="Buy me a coffee button" class="w-32" />
		</a>
	</div>
	<div class="flex flex-1 justify-center">
		<a
			class="text-center text-nowrap underline-offset-2 hover:underline"
			href="https://ferenc02.github.io/"
			target="_blank">Made with ❤️ by Ferenc</a
		>
	</div>
	<ThemeSwitcher />
</footer>
