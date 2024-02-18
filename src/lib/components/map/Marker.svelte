<script lang="ts">
	import { getMap } from '$lib/components/map/Map.svelte';
	import { Marker } from '$lib/maplibreGL';

	const map = getMap();

	export let center;
	let marker = new Marker();

	try {
		marker.setLngLat(center).addTo($map);
		marker.on('click', () => {
			console.log('marker clicked');
		});
	} catch (e) {
		console.error('Failed to create marker', e);
	}
</script>

<slot />
