<script lang="ts">
	import { getMap } from '$lib/components/map/Map.svelte';
	import { Popup, Marker } from '$lib/maplibreGL';
	import { onMount } from 'svelte';

	const map = getMap();

	export let center;
	let marker = new Marker();
	let popup;
	let content: HTMLElement | undefined;

	onMount(() => {
		try {
			marker.setLngLat(center).addTo($map);
			popup = new Popup({ offset: 25 }).setDOMContent(content);
			marker.setPopup(popup);
		} catch (e) {
			// cleanup
			marker?.remove();
			marker = null;
			popup?.remove();
			popup = null;
			console.error(e);
		}

		content = undefined; // if successfully mounted, content is no longer needed. or it will be duplicated.
	});
</script>

{#if $$slots.default && marker}
	<!-- if marker is failed to created, hide slots -->
	<div bind:this={content}>
		<slot />
	</div>
{/if}

<style>
	/* override maplibre-gl's style sheet */

	:global(.maplibregl-popup-content) {
		width: fit-content;
	}
	:global(.maplibregl-popup-close-button) {
		font-size: 15px;
	}
</style>
