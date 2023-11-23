<script lang="ts">
	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/material-symbols/notifications';
	import PostingComponent from './postingComponent.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { coockieStore } from './store/tokenStore';
	import { onMount } from 'svelte';
	import type { UserMeta } from '../models/signup.type';
	import AvatarComponent from './avatarComponent.svelte';
	let modal: HTMLDialogElement | undefined;

	function startPost() {
		modal?.showModal();
	}

	var onSuccess = async () => {
		await invalidateAll();
		modal?.close();
	};

	async function onClick() {
		await goto(`/users/${user.user_id}`);
	}

	let user: UserMeta;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});
</script>

<div class="drawer-side">
	<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay lg:hidden" />
	<ul class="menu p-4 w-60 min-h-full bg-base-200">
		<!-- Sidebar content here -->
		<a href="/home" data-sveltekit-noscroll>
			<li>
				<div class=" join">
					<div class="text-lg">
						<Home />
					</div>
					<div class="flex text-lg">Home</div>
				</div>
			</li></a
		>

		<a href="/explore" data-sveltekit-noscroll>
			<li>
				<div class=" join">
					<div class="text-lg">
						<Search />
					</div>
					<div class="flex text-lg">Explore</div>
				</div>
			</li></a
		>

		<a href="/spaces" data-sveltekit-noscroll>
			<li>
				<div class=" join">
					<div class="text-lg">
						<Satellite />
					</div>
					<div class="flex text-lg">Space</div>
				</div>
			</li></a
		>

		<a href="/notifications" data-sveltekit-noscroll>
			<li>
				<div class="join">
					<div class="text-lg">
						<Bell />
					</div>
					<div class="flex text-lg">Notifications</div>
				</div>
			</li></a
		>
		<div class="btn btn-primary btn-sm h-12 mt-3" on:click={startPost}>
			<div class="text-lg flex flex-row">Post</div>
		</div>
		<div class="flex flex-col mt-auto hover:cursor-pointer" on:click={onClick} >
			<div class="grow" />
			<div class="card card-compact bg-base-300">
				<div class="card-body">
					<div class="flex-row flex">
						<div class="avatar">
							<div class="w-10 rounded-full">
								<AvatarComponent url={user?.picture_meta?.url} userId={user?.user_id} />
							</div>
						</div>
						<div class="pl-2">
							<div class="pl-1 font-semibold">{user?.display_name}</div>
							<div class="pl-0.5 text-primary">@{user?.user_address}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</ul>
</div>

<dialog id="my_modal_2" class="modal" bind:this={modal}>
	<div class="modal-box bg-primary-content">
		<div class="grow">
			<PostingComponent {onSuccess} />
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
