<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import type { TagMeta } from '../../models/trending.type';
	import ExploreComponent from '$lib/exploreComponent.svelte';
	import SeoComponent from '$lib/seoComponent.svelte';

	export let data: PageData;
	let tags: TagMeta[] = data.tags!;
	setContext('user', data.user);
</script>

<svelte:head>
	<SeoComponent
		title="Subspace Explore"
		description="Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"
		img={undefined}
	/>
</svelte:head>

<ExploreComponent {tags} />
