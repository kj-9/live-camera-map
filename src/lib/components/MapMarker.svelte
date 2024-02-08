<script>
	import { getContext } from 'svelte';
	import { Popup, Marker } from '$lib/maplibreGL';

	const { getMap } = getContext('map');
	const map = getMap();

	export let lat;
	export let lon;
	export let label;

	const popup = new Popup({ offset: 25 }).setHTML(label);
	const marker = new Marker().setLngLat([lon, lat]).setPopup(popup).addTo(map);
</script>
