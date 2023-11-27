<script lang="ts">
	import { get } from 'svelte/store';

	export let url: string | undefined;
</script>

{#if url == '' || url == null || url == undefined}
	<img
		loading="lazy"
		src="https://subspace.place/cdn-cgi/image/fit=scale-down,width=150,format=auto/https://subspaceimg.com/default_space_small.png"
	/>
{:else}
	<img
		loading="lazy"
		src="https://subspace.place/cdn-cgi/image/fit=scale-down,width=150,format=auto/{url}"
	/>
{/if}
