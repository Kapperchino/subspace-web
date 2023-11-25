<script lang="ts">
	import { lazyLoadImageAction } from 'svelte-legos';
	import { get } from 'svelte/store';

	export let userId: number | undefined;
	export let url: string | undefined;

	function getAlt(): string {
		const num = userId! % 6;
		return 'default_profile_' + num + '.png';
	}
</script>

{#if url == '' || url == null}
	<img loading="lazy" src="/{getAlt()}" alt="avatar" />
{:else}
	<img
		loading="lazy"
		src={'https://subspace.place/cdn-cgi/image/fit=scale-down,width=150,format=auto/' + url}
		alt="avatar"
	/>
{/if}
