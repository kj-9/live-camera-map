<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import MapMarker from '$lib/components/MapMarker.svelte';
	import Table from '$lib/components/Table.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Search } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import livecams from '../data/livecams.json';

	//console.log(livecams)
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Map>
	{#each livecams as { center, name, html }}
		<MapMarker lon={center[0]} lat={center[1]} label="{name.ja} {html}" />
	{/each}
	<Drawer.Root>
		<Drawer.Trigger class="absolute bottom-5 right-5 z-10">
			<Button>
				<Search class="mr-2 h-4 w-4" size="20" />Search
			</Button>
		</Drawer.Trigger>
		<Drawer.Content class="px-4">
			<Table />
		</Drawer.Content>
	</Drawer.Root>
</Map>
