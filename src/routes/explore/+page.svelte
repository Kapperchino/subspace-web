<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import type { TagMeta } from '../../models/trending.type';
	import ExploreComponent from '$lib/exploreComponent.svelte';

	export let data: PageData;
	let tags: TagMeta[] = data.tags!;
	setContext('user', data.user);
</script>

<ExploreComponent {tags} />
