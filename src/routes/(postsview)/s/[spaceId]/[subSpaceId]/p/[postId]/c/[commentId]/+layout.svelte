<script lang="ts">
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import SortPostComponent from '$lib/sortPostComponent.svelte';
	import { coockieStore } from '$lib/store/tokenStore';
	import { onMount } from 'svelte';

	export let data: import('./$types').LayoutData;

	import Back from '~icons/ic/baseline-arrow-back';
	import type { UserMeta } from '../../../../../../../../../models/signup.type';

	let user: UserMeta;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});
</script>

<!-- <ShellComponent>
	<svelte:fragment slot="navbar">
		<button
			type="button"
			on:click={() => {
				history.back();
			}}
		>
			<div class="text-lg font-bold"><Back /></div>
		</button>
		<div class="flex-1" />
		<div class="md:flex-1" />
		<div class="flex backdrop-blur bg-base-300/60 ml-3 rounded-lg">
			<div class="flex grow" />
			{data.post?.space_name}
			<div class="flex grow" />
		</div>
		<div class="flex grow" />
		<SortPostComponent />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent> -->
<slot />