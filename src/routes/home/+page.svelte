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

<div class="flex flex-row pt-2 justify-center">
	<div class="flex" />
	<div class="grow max-w-md md:max-w-lg"><PostingComponent {onSuccess} /></div>
	<div class="flex" />
</div>
<SpaceComponent posts={data.posts} spaceId={1} />
