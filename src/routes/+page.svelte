<script lang="ts">
	import 'highlight.js/styles/atom-one-dark.css'; // Import a theme

	import Highlight from 'svelte-highlight';
	import typescript from 'svelte-highlight/languages/typescript';

	import xml from 'svelte-highlight/languages/xml';

	import { onMount } from 'svelte';

	const code = `
	const add = (a: number, b: number) => a + b;
	console.log(add(1, 2));

	// Highlight after mounting
`;

	const htmlCode = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Document</title>
	</head>
	<body>
		<h1>Hello World</h1>
	</body>
	</html>

	`;

	// Highlight after mounting
	onMount(() => {});
</script>

<!-- <Highlight language={typescript} {code} /> -->

<Highlight language={xml} code={htmlCode} />
