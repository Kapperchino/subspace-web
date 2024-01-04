<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';
	import { persisted } from 'svelte-persisted-store';
	import { afterNavigate } from '$app/navigation';

	$: posts = persisted(`space-${spaceId}`, data.posts);
	$: offset = persisted(`space-${spaceId}-offset`, 0);
	$: loaded = persisted(`space-${spaceId}-loaded`, false);

	afterNavigate((nav) => {
		if (nav.type == 'enter' || nav.type == 'goto') {
			$posts = data.posts;
			$offset = 0;
			$loaded = false;
		}
	});

	export let data: PageData;
	let spaceId: number = data.spaceId;
	let parentId: number = data.subspace.parent_id;
	setContext('user', data.user);
</script>

<SpaceComponent bind:loaded bind:posts bind:offset {spaceId} />
