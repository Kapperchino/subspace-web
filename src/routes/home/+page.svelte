<script lang="ts">
	import type { PageData } from './$types';

	import { setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import type { Post } from '../../models/post.type';
	import PostingComponent from '$lib/postingComponent.svelte';
	import { invalidate, invalidateAll } from '$app/navigation';
	export let data: PageData;

	var onSuccess = async () => {
		await invalidateAll();
	};

	setContext('user', data.user);
</script>

<PostingComponent {onSuccess} />
<SpaceComponent posts={data.posts} spaceId={1} />
