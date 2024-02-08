<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { readable } from 'svelte/store';
	import { getContext } from 'svelte';

	import * as Table from '$lib/components/ui/table';
	import { addTableFilter } from 'svelte-headless-table/plugins';
	import { Input } from '$lib/components/ui/input';

	import data from '../../data/livecams.json';

	const { getMap } = getContext('map');
	const map = getMap();

	const table = createTable(readable(data), {
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});
	const columns = table.createColumns([
		table.column({
			accessor: ({ name }) => name.ja,
			header: 'Name'
		}),
		table.column({
			accessor: 'keyword',
			header: 'Keyword'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { filterValue } = pluginStates.filter;

	function flyTo(center) {
		const [lng, lat] = center;

		map.flyTo({
			speed: 1,
			curve: 1,
			easing(t) {
				return t;
			},
			essential: true,
			center: [lng, lat],
			zoom: 15
		});
	}

	let height = '60dvh';
	let placeholder = 'Search...';
</script>

<div class="flex items-center py-4">
	<Input class="max-w-sm" {placeholder} type="text" bind:value={$filterValue} />
</div>
<div class="rounded-md border bg-white">
	<Table.Root {height} {...$tableAttrs}>
		<Table.Header class="sticky top-0 border-spacing-0 bg-white">
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row on:click={() => flyTo(row.original.center)} {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
