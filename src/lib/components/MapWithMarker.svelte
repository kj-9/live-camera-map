<script lang="ts">
	import { getData } from '$lib/components/DataProvider.svelte';

	import Map from '$lib/components/map/Map.svelte';
	import MapMarker from '$lib/components/map/MapMarker.svelte';

	const data = getData();
</script>

<Map>
	{#each $data as { position: { center }, name, org, video: { id } }}
		<MapMarker {center}>
			<h1 class="text-lg">{org}: {name}</h1>
			<iframe
				title="{org}: {name}"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/{id}?autoplay=1&playsinline=1"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</MapMarker>
	{/each}
	<slot />
</Map>
