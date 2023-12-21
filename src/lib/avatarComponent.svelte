<script lang="ts">
	import { lazyLoadImageAction } from 'svelte-legos';
	import { get } from 'svelte/store';

	export let userId: number | undefined;
	export let url: string | undefined;

	function getAlt(): string {
		if (userId == undefined) {
			return 'https://subspaceimg.com/default_profile_' + 1 + '.png';
		}
		const num = userId! % 6;
		return 'https://subspaceimg.com/default_profile_' + num + '.png';
	}
</script>

{#if url == '' || url == null}
	<img
		src="https://subspace.place/cdn-cgi/image/fit=scale-down,width=150,format=auto/{getAlt()}"
		alt="avatar"
		width="150"
		height="150"
	/>
{:else}
	<img
		src={'https://subspace.place/cdn-cgi/image/fit=scale-down,width=150,format=auto/' + url}
		alt="avatar"
		width="150"
		height="150"
	/>
{/if}
