<script lang="ts">
	let cardStyling =
		'rounded-lg bg-white p-6 text-center shadow-sm dark:bg-neutral-700 flex flex-col gap-4';

	interface PostPreview {
		title: string;
		date: string;
		category: string;
		image: string;
		content: string;
	}

	let data: PostPreview = $props();

	let characterLimit = 200;
</script>

<section class={cardStyling}>
	<h2 class=" text-3xl font-bold dark:text-white">{data.title}</h2>
	<span class=" text-sm text-gray-500 dark:text-gray-300">{data.date}</span>

	<div class="relative w-full">
		<img
			src={data.image}
			alt="Post preview"
			class="h-48 w-full rounded-lg object-cover shadow-md"
		/>
		<span
			class="absolute top-0 right-0 rounded-bl-lg bg-white p-2 text-black dark:bg-neutral-700 dark:text-white"
		>
			{data.category}
		</span>
	</div>

	<p class=" text-left text-lg text-gray-700 dark:text-gray-300">
		{data.content.length > characterLimit
			? `${data.content.slice(0, characterLimit)}...`
			: data.content}
	</p>

	<div class=" flex justify-center">
		<a
			href={`blog/${data.title}`}
			class="cursor-pointer rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-colors hover:bg-blue-800"
		>
			Read More
		</a>
	</div>
</section>
