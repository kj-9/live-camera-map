<script lang="ts">
	import { getData } from '$lib/components/DataProvider.svelte';
	import iconURL from '../../asset/icons8-wall-mount-camera-96.png';

	import Map from '$lib/components/map/Map.svelte';
	import MarkerLayer from '$lib/components/map/MarkerLayer.svelte';
	import Popup from '$lib/components/map/Popup.svelte';

	const data = getData();

	// GeoJSONオブジェクトの初期化
	const geoJson = {
		type: 'FeatureCollection',
		features: []
	};

	// 提供されたデータをGeoJSON形式に変換する
	$data.forEach((item) => {
		const feature = {
			type: 'Feature',
			properties: {
				name: item.name,
				org: item.org,
				id: item.video.id
			},
			geometry: {
				type: 'Point',
				coordinates: item.position.center
			}
		};
		geoJson.features.push(feature);
	});

	let openPopup = false;
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
	<MarkerLayer geojson={geoJson} {iconURL} {onClick} />
	{#if openPopup}
		<Popup bind:open={openPopup} center={propPopup.center}>
			<h1 class="text-lg">{propPopup.org}: {propPopup.name}</h1>
			<iframe
				title="{propPopup.org}: {propPopup.name}"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/{propPopup.id}?autoplay=1&playsinline=1"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</Popup>
	{/if}
	<slot />
</Map>
