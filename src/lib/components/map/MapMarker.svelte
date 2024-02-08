<script>
	import { contextKey } from '$lib/components/map/Map.svelte';
	import { Popup, Marker } from '$lib/maplibreGL';
	import { getContext } from 'svelte';

	const { getMap } = getContext(contextKey);
	const map = getMap();

	export let lat;
	export let lon;
	export let label;

	const popup = new Popup({ offset: 25 }).setHTML(label);
	const marker = new Marker().setLngLat([lon, lat]).setPopup(popup).addTo(map);
</script>
