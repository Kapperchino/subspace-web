<script lang="ts">
	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/ic/round-notifications-none';
	import Send from '~icons/ic/baseline-send';
	import PostingComponent from './postingComponent.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import { coockieStore } from './store/tokenStore';
	import { onMount } from 'svelte';
	import type { UserMeta } from '../models/signup.type';
	import AvatarComponent from './avatarComponent.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import X from '~icons/bx/x';
	import { page } from '$app/stores';
	let modal: HTMLDialogElement | undefined;

	var onSuccess = async () => {
		await invalidateAll();
		modal?.close();
	};

	let user: UserMeta;
	onMount(() => {
		user = coockieStore.getValue('cookie');
	});

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	$: path = $page.route.id;
</script>

<div class="drawer-side z-50">
	<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay lg:hidden" />
	<ul class="hidden lg:menu p-4 w-60 min-h-full bg-base-200">
		<!-- Sidebar content here -->
		<a href="/home" data-sveltekit-noscroll>
			{#if path?.startsWith('/home')}
				<li class="bg-primary rounded-lg">
					<div class=" join">
						<div class="text-lg text-primary-content">
							<Home />
						</div>
						<div class="flex text-lg text-primary-content">Home</div>
					</div>
				</li>
			{:else}
				<li class="rounded-lg">
					<div class=" join">
						<div class="text-lg">
							<Home />
						</div>
						<div class="flex text-lg">Home</div>
					</div>
				</li>
			{/if}
		</a>

		<a href="/explore" data-sveltekit-noscroll>
			{#if path?.startsWith('/explore')}
				<li class="bg-primary rounded-lg">
					<div class=" join">
						<div class="text-lg text-primary-content">
							<Search />
						</div>
						<div class="flex text-lg text-primary-content">Explore</div>
					</div>
				</li>
			{:else}
				<li class="rounded-lg">
					<div class=" join">
						<div class="text-lg">
							<Search />
						</div>
						<div class="flex text-lg">Explore</div>
					</div>
				</li>
			{/if}
		</a>

		<a href="/spaces" data-sveltekit-noscroll>
			{#if path?.startsWith('/space')}
				<li class="bg-primary rounded-lg">
					<div class=" join">
						<div class="text-lg text-primary-content">
							<Satellite />
						</div>
						<div class="flex text-lg text-primary-content">Space</div>
					</div>
				</li>
			{:else}
				<li class="rounded-lg">
					<div class=" join">
						<div class="text-lg">
							<Satellite />
						</div>
						<div class="flex text-lg">Space</div>
					</div>
				</li>
			{/if}
		</a>

		<a href="/notifications" data-sveltekit-noscroll>
			{#if path?.startsWith('/notifications')}
				<li class="bg-primary rounded-lg">
					<div class=" join">
						<div class="text-lg text-primary-content">
							<Bell />
						</div>
						<div class="flex text-lg text-primary-content">Notifications</div>
					</div>
				</li>
			{:else}
				<li class="rounded-lg">
					<div class=" join">
						<div class="text-lg">
							<Bell />
						</div>
						<div class="flex text-lg">Notifications</div>
					</div>
				</li>
			{/if}
		</a>
		<button type="button" class="btn btn-primary btn-sm h-12 mt-3" use:melt={$trigger}>
			<div class="text-lg flex flex-row">Post</div>
		</button>

		{#if user == undefined}
			<a class="flex flex-col mt-auto" href="/login">
				<div class="btn btn-info shadow-md shadow-info">Log in here!</div>
			</a>{:else}
			<a class="flex flex-col mt-auto hover:cursor-pointer" href="/users/{user.user_id}">
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
			</a>
		{/if}
	</ul>

	<ul class="hidden sm:menu lg:hidden p-4 w-20 min-h-full bg-base-200">
		<!-- Sidebar content here -->
		<a href="/home" data-sveltekit-noscroll>
			{#if path?.startsWith('/home')}
				<li class="bg-primary rounded-lg">
					<div class="text-lg text-primary-content">
						<Home />
					</div>
				</li>
			{:else}
				<li class="rounded-lg">
					<div class="text-lg">
						<Home />
					</div>
				</li>
			{/if}
		</a>

		<a href="/explore" data-sveltekit-noscroll>
			{#if path?.startsWith('/explore')}
				<li class="bg-primary rounded-lg">
					<div class="text-lg text-primary-content">
						<Search />
					</div>
				</li>
			{:else}
				<li class="rounded-lg">
					<div class="text-lg">
						<Search />
					</div>
				</li>
			{/if}
		</a>

		<a href="/spaces" data-sveltekit-noscroll>
			{#if path?.startsWith('/spaces')}
				<li class="bg-primary rounded-lg">
					<div class="text-lg text-primary-content">
						<Satellite />
					</div>
				</li>
			{:else}
				<li class="rounded-lg">
					<div class="text-lg">
						<Satellite />
					</div>
				</li>
			{/if}
		</a>

		<a href="/notifications" data-sveltekit-noscroll>
			{#if path?.startsWith('/notifications')}
				<li class="bg-primary rounded-lg">
					<div class="text-lg text-primary-content">
						<Bell />
					</div>
				</li>
			{:else}
				<li class="rounded-lg">
					<div class="text-lg">
						<Bell />
					</div>
				</li>
			{/if}
		</a>
		<button type="button" class="flex btn btn-primary btn-sm w-14 h-12 mt-3" use:melt={$trigger}>
			<div class="text-lg flex flex-row"><Send /></div>
		</button>

		{#if user == undefined}
			<a class="flex flex-col mt-auto" href="/login">
				<div class="btn btn-info shadow-md shadow-info">Log in here!</div>
			</a>
		{:else}
			<a class="flex flex-col mt-auto hover:cursor-pointer" href="/users/{user.user_id}">
				<div class="grow" />
				<div class="card card-compact bg-base-300">
					<div class="card-body">
						<div class="flex-row flex">
							<div class="avatar">
								<div class="w-10 rounded-full">
									<AvatarComponent url={user?.picture_meta?.url} userId={user?.user_id} />
								</div>
							</div>
							<div class="hidden lg:block pl-2">
								<div class="pl-1 font-semibold">{user?.display_name}</div>
								<div class="pl-0.5 text-primary">@{user?.user_address}</div>
							</div>
						</div>
					</div>
				</div>
			</a>
		{/if}
	</ul>
</div>

<div use:melt={$portalled}>
	{#if $open}
		<div use:melt={$overlay} class="fixed inset-0 z-50 bg-black/50" />
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
			  max-w-xl translate-x-[-50%] translate-y-[-50%] rounded-xl bg-base-300
			  p-3 shadow-lg"
			use:melt={$content}
		>
			<div class="flex flex-row">
				<h2 use:melt={$title} class="flex pb-2 text-lg font-semibold">Comment</h2>
				<div class="grow" />
				<button type="button" class="btn btn-sm btn-circle" use:melt={$close}><X /></button>
			</div>
			<PostingComponent {onSuccess} />
		</div>
	{/if}
</div>
