<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import type { Space } from '../../../models/space.type';
	import SpacePageComponent from '$lib/spacePageComponent.svelte';
	import SeoComponent from '$lib/seoComponent.svelte';

	export let data: PageData;
	let spaces: Space[] = data.spaces!;
	setContext('user', data.user);
</script>

<SeoComponent
	title="Subspace Popular Spaces"
	description="Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"
	img={undefined}
/>
<SpacePageComponent {spaces} />
