<script lang="ts">
	import type { PageData } from './$types';

	import { onMount, setContext } from 'svelte';
	import { page } from '$app/stores';
	import SpaceComponent from '$lib/spaceComponent.svelte';
	import SpaceAvatarComponent from '$lib/spaceAvatarComponent.svelte';

	import User from '~icons/mdi/account';
	import { deleteSubscription, subscribe } from '../../../../../service/subscriptionService';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	let spaceId: number = data.spaceId;
	let parentId: number = data.subspace.parent_id;
	setContext('user', data.user);

	let onClick = async () => {
		if (data.isSubbed) {
			await deleteSubscription(spaceId);
			await invalidateAll();
		} else {
			await subscribe(spaceId);
			await invalidateAll();
		}
	};

	let btnText: string;
	$: btnReactive = btnText;

	onMount(() => {
		if (data.isSubbed) {
			btnText = 'Joined';
		} else {
			btnText = 'Join';
		}
	});

	let onEnter = async () => {
		if (data.isSubbed) {
			btnText = 'Leave';
		} else {
			btnText = 'Join';
		}
	};

	let onLeave = async () => {
		if (data.isSubbed) {
			btnText = 'Joined';
		} else {
			btnText = 'Join';
		}
	};
</script>

<div class="w-full navbar bg-base-300">
	<div class="flex-none md:hidden">
		<label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/></svg
			>
		</label>
	</div>
	<div class="flex grow" />
	{data.subspace.name}
	<div class="flex grow" />

	<div class="flex grow" />
	<div class="backdrop-blur bg-base-300">
		<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
			<a class="tab" href="/s/{parentId}/{spaceId}">Posts</a>
			<a class="tab tab-active" href="/s/{parentId}/{spaceId}/about">About</a>
		</div>
	</div>
	<div class="flex grow" />
</div>

<div class="flex flex-row mt-2">
	<div class="flex grow" />
	<div class="flex grow card card-compact max-w-md md:max-w-xl bg-base-300">
		<div class="avatar pt-2 pl-2">
			<div class="w-24 rounded-full">
				<SpaceAvatarComponent url={data.subspace.small_picture?.url} />
			</div>
		</div>
		<div class="card-title pl-2 pt-2">
			{data.subspace.name}
		</div>
		<div class="flex flex-row ml-2">
			<div class="pt-0.5"><User /></div>
			<div class="font-semibold">{data.subspace.sub_count}</div>
		</div>
		<div class="card-body">
			{data.subspace.description}
		</div>
		<div class="card-actions justify-end pr-5 pb-5">
			{#if data.isSubbed}
				<button
					class="btn btn-sm btn-primary h-11 w-20"
					on:click={onClick}
					on:mouseleave={onLeave}
					on:mouseenter={onEnter}>{btnReactive}</button
				>
			{:else}
				<button
					class="btn btn-sm btn-primary h-11 w-20"
					on:click={onClick}
					on:mouseleave={onLeave}
					on:mouseenter={onEnter}>{btnReactive}</button
				>
			{/if}
		</div>
	</div>
	<div class="flex grow" />
</div>
