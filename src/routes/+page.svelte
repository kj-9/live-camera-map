<script lang="ts">
	import DataProvider from '$lib/components/DataProvider.svelte';
	import MapWithMarker from '$lib/components/MapWithMarker.svelte';

	import * as Drawer from '$lib/components/ui/drawer';
	import Table from '$lib/components/Table.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Search } from 'lucide-svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	$: console.log(data);

	let drawer;
	let open = false;

	function onFly(event) {
		console.log('fly', event.detail);
		console.log(drawer);
		open = false;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<MapWithMarker geoJson={data}>
	<Drawer.Root bind:open>
		<Drawer.Trigger bind:this={drawer} class="absolute bottom-5 right-5 z-10">
			<Button>
				<Search class="mr-2 h-4 w-4" size="20" />Search
			</Button>
		</Drawer.Trigger>
		<Drawer.Content class="px-4">
			<Table data={data.features} on:fly={onFly} />
		</Drawer.Content>
	</Drawer.Root>
</MapWithMarker>
