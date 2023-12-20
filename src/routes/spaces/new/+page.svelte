<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import ExploreComponent from '$lib/exploreComponent.svelte';
	import type { TagMeta } from '../../../models/trending.type';
	import type { Space } from '../../../models/space.type';
	import SpacePageComponent from '$lib/spacePageComponent.svelte';
	import SeoComponent from '$lib/seoComponent.svelte';

	export let data: PageData;
	let spaces: Space[] = data.spaces!;
	setContext('user', data.user);
</script>

<svelte:head>
	<SeoComponent
		title="Subspace New Spaces"
		description="Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"
		img={undefined}
	/>
</svelte:head>

<SpacePageComponent {spaces} />
