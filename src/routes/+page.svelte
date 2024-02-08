<script lang="ts">
	import Map from '$lib/components/Map.svelte';
	import Table from '$lib/components/Table.svelte';
	import * as Drawer from '$lib/components/ui/drawer';

	let open = true;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Map>
	<div class="absolute z-10">
		<Drawer.Root bind:open>
			<Drawer.Trigger>Open</Drawer.Trigger>
			<Drawer.Content>
				<Table />
			</Drawer.Content>
		</Drawer.Root>
	</div>
</Map>
