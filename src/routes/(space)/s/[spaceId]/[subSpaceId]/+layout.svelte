<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import FooterComponent from '$lib/footerComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import { blur } from 'svelte/transition';
	import type { UserMeta } from '../../../../../models/signup.type';
	import { onMount } from 'svelte';
	import { coockieStore } from '$lib/store/tokenStore';
	import SortPostComponent from '$lib/sortPostComponent.svelte';
	import type { LayoutData } from './$types';
	import SeoComponent from '$lib/seoComponent.svelte';

	let user: UserMeta;

	export let data: LayoutData;
	let spaceId: number = data.spaceId;
	let parentId: number = data.subspace.parent_id;
	$: path = $page.route.id;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});
</script>

<svelte:head>
	<SeoComponent
		title="Subspace {data.subspace.name}"
		description={data.subspace.description ??
			"Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"}
		img={data.subspace.small_picture?.url ?? undefined}
	/>
</svelte:head>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex grow" />
		{data.subspace.name}
		<div class="flex grow" />

		<div class="flex grow" />
		<div class="backdrop-blur bg-base-300">
			<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
				{#if path?.endsWith('/about')}
					<a class="tab" href="/s/{parentId}/{spaceId}">Posts</a>
					<a class="tab tab-active" href="/s/{parentId}/{spaceId}/about">About</a>
				{:else}
					<a class="tab tab-active" href="/s/{parentId}/{spaceId}">Posts</a>
					<a class="tab" href="/s/{parentId}/{spaceId}/about">About</a>
				{/if}
			</div>
		</div>
		<div class="flex grow" />
		<div class="flex grow" />

		<SortPostComponent />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent>
