<script lang="ts">
	import { getMap } from '$lib/components/map/Map.svelte';
	import { Popup } from '$lib/maplibreGL';
	import { onMount } from 'svelte';

	const map = getMap();

	export let center;
	export let open = true;

	let popup: Popup = new Popup({ offset: 25 }).setLngLat(center);
	let content: HTMLElement | undefined;

	popup.on('close', () => {
		open = false;

		// reset pitch and bearing
		$map.easeTo({ pitch: 0, bearing: 0 });
	});

	popup.on('open', () => {
		open = true;
	});

	$: if (popup && open) {
		popup.addTo($map);
	}

	onMount(() => {
		try {
			// bind content to popup
			popup.setDOMContent(content);
		} catch (e) {
			console.error('Failed to create popup', e);
		}
		// if successfully binded, content is no longer needed. so asign it to undefined to remove it from the DOM
		// Or it will be remain in the DOM
		content = undefined;
	});
</script>

{#if $$slots.default}
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
