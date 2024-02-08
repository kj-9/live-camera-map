<script lang="ts">
    import { getContext } from 'svelte';

    import { contextKey } from '$lib/components/DataProvider.svelte';
    
    import Map from '$lib/components/map/Map.svelte';
    import MapMarker from '$lib/components/map/MapMarker.svelte';

    const data = getContext(contextKey);

</script>

<Map>
    {#each $data as { center, name, html }}
        <MapMarker lon={center[0]} lat={center[1]} label="{name.ja} {html}" />
    {/each}
    <slot/>
</Map>
