<script lang="ts">
	import { get } from "svelte/store";

export let url: string | undefined;

</script>
{#if url == '' || url == null || url == undefined}
    <img loading="lazy" src="/default_space_small.png"/>
{:else}
    <img loading="lazy" src="{url}">
{/if}



