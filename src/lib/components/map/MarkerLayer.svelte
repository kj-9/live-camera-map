<script lang="ts">
	import { getMap } from '$lib/components/map/Map.svelte';

	export let geoJson;
	export let source: string = 'place';
	export let layer: string = 'place';
	export let iconURL: string;
	export let onClick;
	const map = getMap();

	async function loadLayer() {
		const response = await $map.loadImage(iconURL);

		// guard for image
		if (!response.data) {
			throw new Error('image is null');
		}

		// set marker image
		$map.addImage('location-marker', response.data);

		// Add a GeoJSON source
		$map.addSource(source, {
			type: 'geojson',
			data: geoJson
		});

		// Add a layer showing thesource
		$map.addLayer({
			id: layer,
			type: 'symbol',
			source: source,
			layout: {
				'icon-allow-overlap': true,
				'icon-image': 'location-marker',
				'icon-size': 0.3
			}
		});

		if (onClick) {
			$map.on('click', layer, onClick);
		}
	}

	// Add a layer showing the places.
	$map.on('load', () => {
		loadLayer();
	});
</script>

<slot />
