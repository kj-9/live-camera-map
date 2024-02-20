<script lang="ts">
	import { createTable, Render, Subscribe } from 'svelte-headless-table';
	import { addTableFilter } from 'svelte-headless-table/plugins';

	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';

	import { readable } from 'svelte/store';

	export let data;
	export let onClickRow;

	// create table from data
	const table = createTable(readable(data), {
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		})
	});
	const columns = table.createColumns([
		table.column({
			accessor: (item) => item.properties.org,
			header: 'Organization'
		}),
		table.column({
			accessor: (item) => item.properties.name,
			header: 'Name'
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	// for filtering table rows
	const { filterValue } = pluginStates.filter;

	// params for ui
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
					<Table.Row on:click={() => onClickRow(row.original)} {...rowAttrs}>
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
