<script lang="ts">
	import { createPopover, melt } from '@melt-ui/svelte';
	import type { UserMeta } from '../models/signup.type';
	import AvatarComponent from './avatarComponent.svelte';

	import Dots from '~icons/mdi/dots-vertical';
	import X from '~icons/bx/x';
	import Logout from '~icons/material-symbols/logout-rounded';
	import { coockieStore } from './store/tokenStore';
	import { goto } from '$app/navigation';

	export let user: UserMeta | undefined;

	const {
		elements: { trigger, content, arrow, close },
		states: { open }
	} = createPopover();

	let onclick = async () => {
		coockieStore.deleteValue('cookie');
		await goto('/login');
	};
</script>

{#if user == undefined}
	<a class="flex flex-col mt-auto" href="/login">
		<div class="hidden lg:flex btn btn-info shadow-md shadow-info">Log in here!</div>
		<div class="lg:hidden btn btn-info shadow-md shadow-info">Login</div>
	</a>
{:else}
	<button type="button" class="mt-auto" use:melt={$trigger}>
		<div class="flex flex-col">
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
						<div class="grow" />
						<div class=" flex flex-col text-xl">
							<div class="flex-1" />
							<div class="flex"><Dots /></div>
							<div class="flex-1" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</button>
{/if}

{#if $open}
	<div use:melt={$content} class="card card-compact shadow-lg z-50">
		<div use:melt={$arrow} />
		<ul class="menu menu-lg bg-base-300 w-56 rounded-box">
			<form method="POST" action="/logout?/logout">
				<li>
					<button on:click={onclick}>
						<div class="flex flex-row">
							<div class="flex pt-0.5 text-error"><Logout /></div>
							<div class="flex text-error">Logout</div>
						</div>
					</button>
				</li>
			</form>
		</ul>
	</div>
{/if}
