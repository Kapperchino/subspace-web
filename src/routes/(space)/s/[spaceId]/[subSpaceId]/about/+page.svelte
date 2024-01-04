<script lang="ts">
	import type { PageData } from './$types';

	import { onMount, setContext } from 'svelte';

	import SpaceAvatarComponent from '$lib/spaceAvatarComponent.svelte';

	import User from '~icons/mdi/account';
	import { invalidateAll } from '$app/navigation';
	import { deleteSubscription, subscribe } from '../../../../../../service/subscriptionService';
	import SeoComponent from '$lib/seoComponent.svelte';

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

<svelte:head>
	<SeoComponent
		title="Subspace {data.subspace.name} about"
		description={data.subspace.description ??
			"Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"}
		img={data.subspace.small_picture?.url ?? undefined}
	/>
</svelte:head>

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
