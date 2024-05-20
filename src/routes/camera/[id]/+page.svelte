<script>
	/** @type {import('./$types').PageData} */
	export let data;

	const { video, org, name } = data;
</script>

<h1 class="text-lg">{org}: {name}</h1>
<iframe
	class="aspect-video w-screen md:w-96"
	title="{org}: {name}"
	src="https://www.youtube.com/embed/{video.id}?autoplay=1&playsinline=1"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
	allowfullscreen
></iframe>
