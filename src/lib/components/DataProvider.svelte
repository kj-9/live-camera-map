<script lang="ts" context="module">
	import { getContext } from 'svelte';
	const contextKey = 'DATA';
	export const getData = () => {
		const data = getContext(contextKey);
		return data;
	};
</script>

<script>
	import { setContext } from 'svelte';
	import { readable } from 'svelte/store';

	import data from '../../data/livecams.json';

	const _data = readable(data);
	setContext(contextKey, _data);
</script>

<slot />
