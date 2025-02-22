<script lang="ts">
	import { onMount } from 'svelte';

	import sunSVG from '../../images/sun.svg';
	import moonSVG from '../../images/moon.svg';

	let isDark: boolean = $state(false);

	onMount(() => {
		isDark = localStorage.getItem('theme') === 'dark';
	});

	// Toggle theme between dark and light
	const toggleTheme = () => {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	};
</script>

<aside class="flex w-32 items-center justify-end space-x-2">
	<span class="text-xs text-gray-500">&copy; 2025</span>
	<button
		class={`flex h-8 w-16 cursor-pointer items-center rounded-full border p-1  transition-colors ${isDark ? 'border-neutral-700 bg-neutral-700 ' : 'border-gray-200 bg-slate-100 '}`}
		onclick={toggleTheme}
		aria-label="Toggle theme"
	>
		<div
			class={`rounded-ful h-6 w-6 transform rounded-full filter transition-transform ${isDark ? 'translate-x-0' : 'translate-x-8'}`}
		>
			<img
				src={isDark ? moonSVG : sunSVG}
				alt="Theme switcher"
				class={`h-6 w-6 ${isDark ? '' : 'invert'}`}
			/>
		</div>
	</button>
</aside>
