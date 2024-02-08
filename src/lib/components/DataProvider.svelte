<script lang="ts" context="module">
    export const contextKey = 'DATA';
</script>


<script>
    import { setContext } from 'svelte';
    import { readable } from 'svelte/store';

    import data from '../../data/livecams.json';


    setContext(contextKey, readable(data));
</script>


<slot/>
