<script context="module" lang="ts">
	import { getContext } from 'svelte';
	const contextKey = 'MAP';

	export const getMap = () => {
		const map = getContext(contextKey);
		return map;
	};

	export let map = writable(null);
</script>

<script lang="ts">
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { onDestroy, setContext } from 'svelte';
	import {
		Map,
		NavigationControl,
		GeolocateControl,
		FullscreenControl,
		AttributionControl
	} from '$lib/maplibreGL';

	import layers from 'protomaps-themes-base';
	import { writable } from 'svelte/store';
	// create .env.local file and add VITE_PROTOMAPS_API_KEY=your_protomaps_api_key
	const protomapsURL = `https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.pbf?key=${import.meta.env.VITE_PROTOMAPS_API_KEY}`;

	setContext(contextKey, map);
	let layerStyle: string;

	// get hour. this is not always return JST. it depends on browser's timezone.
	const hour = new Date().getHours();
	if (hour < 6 || hour >= 18) {
		layerStyle = 'dark';
	} else {
		layerStyle = 'light';
	}

	function loadMap(container: HTMLDivElement) {
		$map = new Map({
			container,
			maxZoom: 17, // for current protomap api
			attributionControl: false,
			style: {
				version: 8,
				glyphs: 'https://cdn.protomaps.com/fonts/pbf/{fontstack}/{range}.pbf',
				sources: {
					protomaps: {
						type: 'vector',
						tiles: [protomapsURL],
						attribution:
							'<a href="https://protomaps.com">Protomaps</a> © <a href="https://openstreetmap.org">OpenStreetMap</a>'
					}
				},
				layers: layers('protomaps', layerStyle),
				center: [139.766, 35.681],
				zoom: 9.5
			}
		});

		$map.addControl(new AttributionControl({}), 'bottom-left');

		$map.addControl(
			new NavigationControl({
				visualizePitch: true
			})
		);
		$map.addControl(new FullscreenControl());
		// 現在位置表示
		$map.addControl(
			new GeolocateControl({
				positionOptions: {
					enableHighAccuracy: false
				},
				fitBoundsOptions: { maxZoom: 16 },
				trackUserLocation: true,
				showUserLocation: true
			})
		);

		// if devlopment, log bearing
		if (import.meta.env.MODE === 'development') {
			$map.on('click', function (e) {
				console.log('dev-mode: bearing', $map.getBearing());
			});
		}
	}

	onDestroy(() => {
		if ($map) $map.remove();
	});
</script>

<div use:loadMap>
	{#if $map}
		<slot />
	{/if}
</div>

<style>
	div {
		width: 100vw;
		height: 100dvh;
	}
</style>
