<script lang="ts">
	import { contextKey } from '$lib/components/map/Map.svelte';
	import { Popup, Marker } from '$lib/maplibreGL';
	import { getContext } from 'svelte';

	const { getMap } = getContext(contextKey);
	const map = getMap();

	export let lat;
	export let lon;
	export let content;

	const popup = new Popup({ offset: 25 }).setHTML(content);
	const marker = new Marker().setLngLat([lon, lat]).setPopup(popup).addTo(map);
</script>
