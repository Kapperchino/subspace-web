<script lang="ts">
	import { get } from "svelte/store";

export let userId: number | undefined;
export let url: string | undefined;

function getAlt() : string{
    const num = userId!%6;
    return "default_profile_" + num + ".png"
}
</script>
{#if url == '' || url == null}
    <img src="/{getAlt()}"/>
{:else}
    <img src="{url}">
{/if}



