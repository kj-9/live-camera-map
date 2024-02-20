<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer';
	import Table from '$lib/components/Table.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Search } from 'lucide-svelte';

	import { map } from '$lib/components/map/Map.svelte';
	import iconURL from '../asset/icons8-wall-mount-camera-96.png';
	import Map from '$lib/components/map/Map.svelte';
	import MarkerLayer from '$lib/components/map/MarkerLayer.svelte';
	import Popup from '$lib/components/map/Popup.svelte';
	import { page } from '$app/stores';
	import { pushState } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;

	let openPopup: boolean = false;
	let openDrawer = false;

	const FLY_DURATION = 3000;

	const onClickMarker = (e) => {
		const feature = e.features[0];

		pushState('', {
			selected: {
				geometry: feature.geometry,
				properties: feature.properties
			}
		});

		if (openPopup) {
			openPopup = false;
		} else {
			$map.once('moveend', () => {
				openPopup = true;
			});
		}
	};

	const onClickRow = (feature) => {
		openDrawer = false;
		pushState('', {
			selected: {
				geometry: feature.geometry,
				properties: feature.properties
			}
		});

		if (openPopup) {
			openPopup = false;
		} else {
			$map.once('moveend', () => {
				openPopup = true;
			});
		}
	};

	$: {
		const feature = $page.state.selected;

		// fly to selected marker
		if (feature && $map) {
			$map.flyTo({
				speed: 1,
				essential: true,
				center: feature.geometry.coordinates,
				pitch: 60, // tilt, 60 is max
				bearing: feature.properties.bearing, // bearing in degrees
				zoom: 15
			});
		}
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Map>
	<MarkerLayer geoJson={data} {iconURL} onClick={onClickMarker} />
	{#if openPopup && $page.state.selected}
		{@const {
			properties: { id, name, org },
			geometry: { coordinates }
		} = $page.state.selected}
		<Popup bind:open={openPopup} center={coordinates}>
			<h1 class="text-lg">{org}: {name}</h1>
			<iframe
				class="aspect-video w-screen md:w-96"
				title="{org}: {name}"
				src="https://www.youtube.com/embed/{id}?autoplay=1&playsinline=1"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		</Popup>
	{/if}
	<Drawer.Root bind:open={openDrawer}>
		<Drawer.Trigger class="absolute bottom-5 right-5 z-10">
			<Button>
				<Search class="mr-2 h-4 w-4" size="20" />Search
			</Button>
		</Drawer.Trigger>
		<Drawer.Content class="px-4">
			<Table data={data.features} {onClickRow} />
		</Drawer.Content>
	</Drawer.Root>
</Map>
