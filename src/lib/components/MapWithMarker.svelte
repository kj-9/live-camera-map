<script lang="ts">
	import { getContext } from 'svelte';

	import { contextKey } from '$lib/components/DataProvider.svelte';

	import Map from '$lib/components/map/Map.svelte';
	import MapMarker from '$lib/components/map/MapMarker.svelte';

	const data = getContext(contextKey);

	const getIframe = (id: string, width: string, height: string) => {
		return `<iframe width=\"${width}\" height=\"${height}\" src=\"https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>`;
	};
</script>

<Map>
	{#each $data as { position: { center }, name, org, video: { id }, title }}
		<MapMarker lon={center[0]} lat={center[1]}>
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
