<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import SeoComponent from '$lib/seoComponent.svelte';


	export let data: PageData;
	setContext('user', data.user);
</script>

<svelte:head>
	<SeoComponent
		title="Subspace Search"
		description="Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"
		img={undefined}
	/>
</svelte:head>

<div class="w-full navbar bg-base-300">
	<div class="flex-none md:hidden">
		<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/></svg
			>
		</label>
	</div>
	<div class="flex grow" />
	Search
	<div class="flex grow" />
	<div class="flex grow" />
	<div class="flex grow" />
	<div class="backdrop-blur bg-base-300">
		<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
			<a class="tab tab-active" href="/search/posts">Posts</a>
			<a class="tab" href="/search/spaces">Spaces</a>
			<a class="tab" href="/search/users">Users</a>
		</div>
	</div>
	<div class="flex grow" />
	<div class="flex grow" />

	<div class="flex grow" />
	<div class="flex grow" />
	<div class="flex grow" />
</div>
