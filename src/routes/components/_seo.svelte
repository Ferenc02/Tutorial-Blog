<script>
	import { page } from '$app/stores';

	export let title = 'Home | CodeJournal';
	export let description = 'Description of your website.';
	export let image = 'https://codejournal-dev.vercel.app/favicon.png';
</script>

<svelte:head>
	<title>{title} | CodeJournal</title>
	<meta name="description" content={description} />
	<meta property="og_site_name" content="codejournal-dev.vercel.app" />
	<meta property="og:url" content="https://codejournal-dev.vercel.app/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="codejournal-dev.vercel.app" />
	<meta property="twitter:url" content="https://codejournal-dev.vercel.app/" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	{@html `  <script type="application/ld+json">
	{
     "@context": "https://schema.org",
     "@type": "Website",
     "name": "${title} | ",
     "url": "https://codejournal-dev.vercel.app/",
     "logo": "${image}"  }
	 </script>
	 `}
</svelte:head>
