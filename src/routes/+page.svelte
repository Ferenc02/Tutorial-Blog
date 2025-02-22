<script lang="ts">
	import { onMount } from 'svelte';

	import { fade } from 'svelte/transition';

	import SEO from './components/_seo.svelte';

	// Typewriter effect
	const typeWriter = () => {
		const textElement: any = document.querySelector('.welcome-title');

		const wrapTextNodes = (element: HTMLElement) => {
			const nodes = Array.from(element.childNodes);

			nodes.forEach((node: any) => {
				if (node.nodeType === Node.TEXT_NODE) {
					// Normalize the text content: remove excess spaces and trim
					const textContent = node.textContent.replace(/\s+/g, ' ').trim();

					const fragment = document.createDocumentFragment();
					textContent.split(' ').forEach((word: string) => {
						const span = document.createElement('span');
						span.textContent = word; // Set the word text
						span.classList.add('word');
						fragment.appendChild(span);

						// Add a space between words, but not after the last word
						const space = document.createTextNode('\u00A0');
						fragment.appendChild(space);
					});

					element.replaceChild(fragment, node); // Replace the text node with spans
				} else if (node.nodeType === Node.ELEMENT_NODE) {
					wrapTextNodes(node); // Recursively handle nested elements
				}
			});
		};

		// Wrap text nodes in words
		wrapTextNodes(textElement);

		// Animate each word's opacity
		const words = document.querySelectorAll('.word');

		words.forEach((word, index) => {
			setTimeout(() => {
				word.classList.add('active');
			}, index * 100); // Adjust delay as needed for word-based animation
		});
	};

	// Run the typewriter effect after the component mounts
	onMount(() => {
		typeWriter();
	});
</script>

<SEO
	title={'Home'}
	description={'Welcome to my site. Learn web development from basics to advanced topics.'}
/>

<!--  m-12 md:m-32-->
<div class="absolute top-1/2 -translate-y-1/2 md:ml-8" in:fade={{ duration: 300 }}>
	<div
		class=" solway-regular welcome-title ml-4 h-min text-2xl font-light break-words text-gray-600 md:w-1/2 md:text-5xl md:leading-relaxed dark:text-white"
	>
		Hi, I'm <span class="font-medium text-gray-700 dark:text-white">Ferenc.</span> Welcome to my site.
		Learn web development from basics to advanced topics.
	</div>
</div>
