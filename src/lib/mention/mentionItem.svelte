<script lang="ts">
	import { type ComponentType, createEventDispatcher } from 'svelte';
	import type { UserInfo } from '../../models/signup.type';
	import AvatarComponent from '$lib/avatarComponent.svelte';

	const dispatcher = createEventDispatcher<{
		active: HTMLElement;
	}>();
	export let user: UserInfo;
	export let active = false;
	export let onClick = () => {};
	let element: HTMLElement;

	$: bg = active ? 'bg-secondary' : 'bg-base-200';
	$: {
		if (active) {
			// wait for next tick make sure layout is ready
			setTimeout(() => {
				dispatcher('active', element);
			});
		}
	}
</script>

<button on:click={onClick} bind:this={element} class="flex grow flex-row {bg} py-2 px-2 rounded-lg">
	<div class="flex avatar p-0">
		<div class="w-6 rounded-full">
			<AvatarComponent userId={user.user_id} url={user.picture_meta?.url} />
		</div>
	</div>
	<div class="flex pl-3">
		<span class="text-lg">{user.display_name}</span>
	</div>
</button>
