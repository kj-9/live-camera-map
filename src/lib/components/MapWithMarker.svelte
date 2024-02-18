<script lang="ts">
	import iconURL from '../../asset/icons8-wall-mount-camera-96.png';

	import Map from '$lib/components/map/Map.svelte';
	import MarkerLayer from '$lib/components/map/MarkerLayer.svelte';
	import Popup from '$lib/components/map/Popup.svelte';

	export let geoJson;

	let openPopup: boolean = false;
	let propPopup = undefined;

	const onClick = (e) => {
		const feature = e.features[0];
		const coordinates = feature.geometry.coordinates;

		// Ensure that if the map is zoomed out such that multiple
		// copies of the feature are visible, the popup appears
		// over the copy being pointed to.
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
		}

		propPopup = {
			center: coordinates,
			id: feature.properties.id,
			name: feature.properties.name,
			org: feature.properties.org
		};

		openPopup = true;
	};
</script>

<Map>
	<MarkerLayer {geoJson} {iconURL} {onClick} />
	{#if openPopup}
		{@const { center, id, name, org } = propPopup}
		<Popup bind:open={openPopup} {center}>
			<h1 class="text-lg">{org}: {name}</h1>
			<iframe
				title="{org}: {name}"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/{id}?autoplay=1&playsinline=1"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</Popup>
	{/if}
	<slot />
</Map>
