<script>
	/** @type {import('./$types').PageData} */
	export let data;

	console.log(data);
</script>

<h1>{data.name}</h1>
<div>{@html data.id}</div>
