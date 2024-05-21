<script>
	import Table from '$lib/components/Table.svelte';

	export let data;
</script>

<Table data={data.features} />

<div class="container mt-4">
	<a href="/map">地図で見る</a>
	<a href="/">TOPにもどる</a>
</div>
