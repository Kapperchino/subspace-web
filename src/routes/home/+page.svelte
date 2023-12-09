<script lang="ts">
	import type { PageData } from './$types';

	import { onMount, setContext } from 'svelte';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import PostingComponent from '$lib/postingComponent.svelte';
	import { afterNavigate, invalidateAll } from '$app/navigation';
	import { coockieStore } from '$lib/store/tokenStore';
	import SeoComponent from '$lib/seoComponent.svelte';
	import { persisted } from 'svelte-persisted-store';
	export let data: PageData;

	$: posts = persisted('home', data.posts);
	$: offset = persisted('home-offset', 0);
	$: loaded = persisted('home-loaded', false);

	afterNavigate((nav) => {
		if (nav.type == 'enter' || nav.type == 'goto') {
			$posts = data.posts;
			$offset = 0;
			$loaded = false;
		}
		console.log(nav.type);
	});

	onMount(() => {
		coockieStore.setValue('cookie', data.user);
	});

	var onSuccess = async () => {
		await invalidateAll();
	};

	setContext('user', data.user);
</script>

<svelte:head>
	<SeoComponent
		title="Subspace"
		description="Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"
		img={undefined}
	/>
</svelte:head>

<div class="flex flex-row pt-2 justify-center">
	<div class="flex" />
	<div class="grow max-w-full md:max-w-xl"><PostingComponent {onSuccess} /></div>
	<div class="flex" />
</div>

<SpaceComponent bind:loaded bind:posts bind:offset spaceId={1} />
