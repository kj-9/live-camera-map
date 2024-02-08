<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import Table from '$lib/components/Table.svelte';
	import * as Drawer from '$lib/components/ui/drawer';
	import { Search } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';

	//let open = true;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Map>
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
