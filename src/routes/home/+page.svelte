<script lang="ts">
	import type { PageData } from './$types';

	import { onMount, setContext } from 'svelte';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import PostingComponent from '$lib/postingComponent.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { coockieStore } from '$lib/store/tokenStore';
	import SkeletonPosts from '$lib/skeletonPosts.svelte';
	export let data: PageData;

	onMount(() => {
		coockieStore.setValue('cookie', data.user);
	});

	var onSuccess = async () => {
		await invalidateAll();
	};

	setContext('user', data.user);
</script>

<div class="flex flex-row pt-2 justify-center">
	<div class="flex" />
	<div class="grow max-w-md md:max-w-xl"><PostingComponent {onSuccess} /></div>
	<div class="flex" />
</div>

{#await data.streamed.posts}
	<SkeletonPosts />
{:then value}
	<SpaceComponent posts={value} spaceId={1} />
	
{:catch error}
	{error.message}
{/await}
