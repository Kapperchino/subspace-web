<script lang="ts">
	import { get } from "svelte/store";

export let url: string | undefined;

</script>
{#if url == '' || url == null || url == undefined}
    <img src="/default_space_small.png"/>
{:else}
    <img src="{url}">
{/if}



