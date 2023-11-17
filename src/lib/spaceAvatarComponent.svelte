<script lang="ts">
	import { get } from "svelte/store";
    import image from '$lib/static/default_space_small.png';

export let url: string | undefined;

</script>
{#if url == '' || url == null || url == undefined}
    <img src="{image}"/>
{:else}
    <img src="{url}">
{/if}



