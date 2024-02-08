<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLTableAttributes } from 'svelte/elements';

	type $$Props = HTMLTableAttributes & { height?: string };

	let className: $$Props['class'] = undefined;
	export { className as class };
	export let height: $$Props['height'] = undefined;
</script>

<div class="w-full overflow-auto" style="height:{height}">
	<table class={cn('w-full caption-bottom text-sm', className)} {...$$restProps}>
		<slot />
	</table>
</div>
