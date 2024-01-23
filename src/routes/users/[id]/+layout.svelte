<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import type { LayoutData } from './$types';
	import AvatarComponent from '$lib/avatarComponent.svelte';
	import { onMount } from 'svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
	import Pencil from '~icons/material-symbols/edit-rounded';
	import { coockieStore } from '$lib/store/tokenStore';
	import type { UserMeta } from '../../../models/signup.type';
	import PhotoEditButton from '$lib/user/photoEditButton.svelte';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import { Editor } from '@tiptap/core';
	import XIcon from '~icons/bx/x';
	import { goto, invalidateAll } from '$app/navigation';
	import { backendUrl } from '$lib/store/clientBackendUrl';
	import { addToast } from '$lib/toaster.svelte';

	export let data: LayoutData;

	let user: UserMeta | undefined;
	let editor: Editor | undefined;
	let editorDiv: HTMLElement;
	$: editingBio = false;
	$: hidden = !editingBio ? 'hidden' : '';

	onMount(() => {
		user = coockieStore.getValue('cookie');
		editor = new Editor({
			element: editorDiv,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Comment here!',
					emptyEditorClass:
						'cursor-text text-xl before:content-[attr(data-placeholder)] before:absolute  before:opacity-70 before-pointer-events-none'
				})
			],
			editorProps: {
				attributes: {
					class: 'prose dark:prose-invert prose-base focus:outline-none'
				}
			}
		});
		editor.chain().setContent(data.user.bio!).run();
	});

	async function updateBio(e: Event) {
		const user: UserMeta = coockieStore.getValue('cookie');
		if (user == undefined) {
			await goto('/login');
			return;
		}
		var res = await updateUserBio(user.user_id, editor?.getHTML());
		updateSuccess();
		editingBio = false;
		await invalidateAll();
	}

	async function updateUserBio(userId: number, bio: string | undefined) {
		const data: Response = await fetch(`${backendUrl}/users/${userId}`, {
			method: 'PUT',
			body: JSON.stringify({ bio: bio }),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${user?.token}`
			}
		});
		return await data;
	}

	function updateSuccess() {
		addToast({
			data: {
				title: 'Success',
				description: '🎉 Profile update Success!',
				type: 'success'
			}
		});
	}
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex grow flex-row justify-center">User Page</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div class="flex flex-row mt-2 justify-center">
			<div class="flex" />
			<div class="flex grow card card-compact max-w-full md:max-w-lg bg-base-300 relative">
				<div class="flex flex-row justify-center">
					<div>
						<div class="indicator">
							{#if user?.user_id === Number(data.params.id)}
								<PhotoEditButton>
									<svelte:fragment slot="button">
										<button
											type="button"
											class="btn btn-circle btn-primary btn-sm absolute left-20 bottom-16 z-10"
										>
											<Pencil />
										</button>
									</svelte:fragment>
								</PhotoEditButton>
							{/if}
							<div class="avatar pt-2 pl-2">
								<div class="w-24 rounded-full">
									<AvatarComponent url={data.user.picture_meta?.url} userId={data.user?.user_id} />
								</div>
							</div>
						</div>
						<div class="card-title pl-10 pt-2">
							{data.user.display_name}
						</div>
						<div class="pl-9 text-primary">@{data.user.user_address}</div>
					</div>
				</div>
				{#if user?.user_id === Number(data.params.id)}
					<div class="flex flex-row grow justify-end">
						<button
							type="button"
							class="flex btn btn-primary btn-sm mx-2"
							on:click={() => {
								editingBio = !editingBio;
								if (editingBio) {
									editor?.chain().focus().run();
								}
							}}
						>
							<Pencil />
						</button>
					</div>
				{/if}

				<form method="POST" action="?/post">
					<label class="label">
						<div
							bind:this={editorDiv}
							class="tiptap textarea textarea-md textarea-bordered textarea-primary w-full cursor-text mx-2 {hidden}"
							on:click={() => {
								editor?.chain().focus().run();
							}}
						/>
					</label>

					{#if editingBio}
						<div class="flex-row flex pl-1">
							<div class="grow" />
							<button
								type="button"
								on:click={updateBio}
								class="btn btn-primary btn-sm justify-self-end h-10 w-20 mb-2 mr-2"
								>Update
							</button>
						</div>
					{/if}
				</form>
				{#if !editingBio}
					<div
						class="prose max-w-none break-words flex flex-row grow justify-center pb-3 pt-2 px-3"
					>
						{@html data.user.bio}
					</div>
				{/if}
			</div>
		</div>
		<slot />
	</svelte:fragment>
</ShellComponent>
