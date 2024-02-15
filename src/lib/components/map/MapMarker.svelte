<script lang="ts">
	import { contextKey } from '$lib/components/map/Map.svelte';
	import { Popup, Marker } from '$lib/maplibreGL';
	import { getContext } from 'svelte';

	const { getMap } = getContext(contextKey);
	const map = getMap();

	export let lat;
	export let lon;
	let content: HTMLElement;

	$: if (content) {
		const popup = new Popup({ offset: 25 }).setDOMContent(content);
		new Marker().setLngLat([lon, lat]).setPopup(popup).addTo(map);
	}
</script>

<div bind:this={content}>
	<slot />
</div>

<style>
	/* override maplibre-gl's style sheet */

	:global(.maplibregl-popup-content) {
		width: fit-content;
	}
	:global(.maplibregl-popup-close-button) {
		font-size: 15px;
	}
</style>
