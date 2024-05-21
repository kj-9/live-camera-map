<script>
	/** @type {import('./$types').PageData} */
	export let data;

	const { video, org, name } = data;
</script>

<div class="container">
	<h1 class="mb-2 text-lg">{org}: {name}</h1>

	<iframe
		class="aspect-video h-auto w-full max-w-full rounded-md shadow-md"
		title="{org}: {name}"
		src="https://www.youtube.com/embed/{video.id}?autoplay=1&playsinline=1"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
</div>

<div class="container mt-4">
	<a href="/table">一覧に戻る</a>
	<a href="/map">地図で見る</a>
	<a href="/">TOPにもどる</a>
</div>
