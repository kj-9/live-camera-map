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
	import { MapPin } from 'lucide-svelte';
	//import { MapPin } from 'lucide-svelte';

	const protomapsURL = `https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.pbf?key=${'23b043bfcb8e65d8'}`;

	//let container;
	let map;
	const key = {};

	setContext(key, {
		getMap: () => map
	});

	function loadMap(container: HTMLDivElement) {
		map = new Map({
			container,
			maxZoom: 15.9, // for current protomap api
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
				layers: layers('protomaps', 'light'),
				center: [130.398, 33.591],
				zoom: 13
			}
		});

		map.addControl(new AttributionControl({}), 'bottom-left');

		map.addControl(
			new NavigationControl({
				visualizePitch: true
			})
		);
		map.addControl(new FullscreenControl());
		// 現在位置表示
		map.addControl(
			new GeolocateControl({
				positionOptions: {
					enableHighAccuracy: false
				},
				fitBoundsOptions: { maxZoom: 16 },
				trackUserLocation: true,
				showUserLocation: true
			})
		);
	}

	onDestroy(() => {
		if (map) map.remove();
	});
</script>

<div use:loadMap>
	<slot />
</div>

<style>
	div {
		width: 100vw;
		height: 100vh;
	}
</style>
