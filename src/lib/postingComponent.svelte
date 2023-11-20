<script lang="ts">
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import XIcon from '~icons/bx/x';
	import { textareaAutosizeAction } from 'svelte-legos';
	import {
		ContentType,
		type FileUploadRequest,
		type PictureRequestMeta,
		type PostCreation
	} from '../models/post.type';
	import { coockieStore } from './store/tokenStore';
	import type { UserMeta } from '../models/signup.type';
	import {
		createPostClient,
		processVideo,
		uploadFile,
		uploadMedia
	} from '../service/postingService';

	import toast, { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import { invalidate, invalidateAll } from '$app/navigation';

	$: hasTitle = false;
	$: hasLink = false;
	let picList: Array<[string, File]> = [];
	let vidList: Array<[string, File]> = [];
	let picFiles: FileList | undefined;
	let vidFiles: FileList | undefined;
	let picInput: HTMLInputElement;
	let videoInput: HTMLInputElement;
	let postReq: PostCreation = {
		space_id: 1,
		poster_id: 0,
		topic: '',
		body: '',
		link: '',
		content_type: ContentType.Text,
		file_ids: []
	};

	export let onSuccess = () => {}; // no-operation function;

	function resetPost() {
		postReq = {
			space_id: 1,
			poster_id: 0,
			topic: '',
			body: '',
			link: '',
			content_type: ContentType.Text,
			file_ids: []
		};
		hasTitle = false;
		hasLink = false;
		closeImage();
		closeVideo();
	}

	async function onPicChange(e: Event) {
		if (picFiles != undefined) {
			for (let i = 0; i < picFiles.length; i++) {
				const val = picFiles.item(i)!;
				const reader = new FileReader();
				reader.onload = (e) => {
					picList.push([e.target!.result!.toString(), val]);
					picList = picList;
				};
				reader.readAsDataURL(val);
			}
		}
	}

	async function onVidChange(e: Event) {
		if (vidFiles != undefined) {
			for (let i = 0; i < vidFiles.length; i++) {
				const val = vidFiles.item(i)!;
				const reader = new FileReader();
				reader.onload = (e) => {
					vidList.push([e.target!.result!.toString(), val]);
					vidList = vidList;
				};
				reader.readAsDataURL(val);
			}
		}
	}

	async function createPost(e: Event) {
		if (postReq.link != '') {
			postReq.content_type = ContentType.Link;
		} else if (vidList != null && vidList.length > 0) {
			postReq.content_type = ContentType.Video;
		} else if (picList != null && picList.length > 0) {
			postReq.content_type = ContentType.Picture;
		}
		if (postReq.link == '' && vidList.length == 0 && picList.length == 0 && postReq.body == '') {
			toast.error('Empty post is not allowed!', {
				icon: '❌',
				position: 'bottom-center',
				style: 'border-radius: 300px; background: oklch(var(--b3)); color: oklch(var(--er));'
			});
			return;
		}
		const user: UserMeta = coockieStore.getValue('cookie');
		postReq.poster_id = user.user_id;
		const fileIds: number[] = [];
		if (postReq.content_type === ContentType.Picture) {
			const memoryImg = document.createElement('img');
			memoryImg.src = picList[0][0];
			const width = memoryImg.width;
			const height = memoryImg.height;
			const picUploadReq: PictureRequestMeta = {
				height: height,
				url: '',
				width: width
			};
			const fileUploadReq: FileUploadRequest = {
				picture_meta: picUploadReq,
				file_type: 'picture',
				is_link: undefined
			};
			var picRes = await uploadMedia(fileUploadReq);
			var uploadRes = await uploadFile(picList[0][1], picRes.data.presigned, picList[0][1].type);
			fileIds.push(picRes.data.id);
		} else if (postReq.content_type === ContentType.Video) {
			const fileUploadReq: FileUploadRequest = {
				picture_meta: undefined,
				file_type: 'video',
				is_link: undefined
			};
			var videoRes = await uploadMedia(fileUploadReq);
			var uploadRes = await uploadFile(vidList[0][1], videoRes.data.presigned, vidList[0][1].type);
			var videoProcess = await processVideo(videoRes.data.id);
			fileIds.push(videoRes.data.id);
		}
		//at this point everything should be uploaded
		postReq.file_ids = fileIds;
		await createPostClient(postReq);
		resetPost();
		toast.success('Post Successful!', {
			icon: '🎉',
			position: 'bottom-center',
			style: 'border-radius: 200px; background: oklch(var(--b3)); color: oklch(var(--su));'
		});
		onSuccess();
	}

	function toggleTitle() {
		hasTitle = !hasTitle;
	}

	function toggleLink() {
		hasLink = !hasLink;
	}

	function closeImage() {
		if (picList.length > 0) {
			picList.pop();
			picList = picList;
			picInput.value = '';
		}
	}

	function closeVideo() {
		if (vidList.length > 0) {
			vidList.pop();
			vidList = vidList;
			videoInput.value = '';
		}
	}
</script>

<div class="card card-compact flex shadow-lg bg-primary-content grow max-w-xl">
	<div class="card-body">
		<form method="POST" action="?/post">
			{#if hasTitle}
				<label class="label">
					<textarea
						use:textareaAutosizeAction
						class="textarea textarea-md textarea-secondary textarea-bordered w-full grid-cols-[auto_1fr_auto]"
						name="Title"
						placeholder="Title(Optional)"
						rows="1"
						bind:value={postReq.topic}
					/>
				</label>
			{/if}
			{#if hasLink}
				<label class="label">
					<textarea
						class="textarea textarea-md textarea-accent textarea-bordered w-full grid-cols-[auto_1fr_auto]"
						name="Link"
						placeholder="Link(Optional)"
						rows="1"
						bind:value={postReq.link}
					/>
				</label>
			{/if}
			<label class="label">
				<textarea
					use:textareaAutosizeAction
					class="textarea textarea-md textarea-primary textarea-bordered w-full grid-cols-[auto_1fr_auto]"
					name="Post"
					placeholder="Post here!"
					bind:value={postReq.body}
				/>
			</label>
			<div class="flex flex-row pl-1">
				{#if !hasTitle}
					<div class="btn btn-xs btn-primary" on:click={toggleTitle}>+Title</div>
				{:else}
					<div class="btn btn-xs btn-error" on:click={toggleTitle}>-Title</div>
				{/if}
				<div class="join-item pl-1" />
				<div class="btn btn-xs btn-secondary">@Subspace</div>
			</div>

			{#if picList != null && picList.length > 0 && vidList.length == 0}
				<div class="flex-row flex pb-1 pt-3">
					<div class="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-md">
						<img class="object-scale-down h-24 w-24 p-1" src={picList.at(0)?.[0]} />
						<div class="pl-1" />
						<button
							type="button"
							on:click={closeImage}
							class="absolute btn btn-xs btn-circle btn-error h-6 w-6 bottom-20 left-20"
							><XIcon /></button
						>
					</div>
				</div>
			{/if}

			{#if vidList != null && vidList.length > 0 && picList.length == 0}
				<div class="flex-row flex pb-1 pt-3">
					<div class="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-md">
						<video
							class="object-scale-down clip-thumbnail h-24 w-24 p-1"
							src={vidList.at(0)?.[0]}
						/>
						<div class="pl-1" />
						<button
							type="button"
							on:click={closeVideo}
							class="absolute btn btn-xs btn-circle btn-error h-6 w-6 bottom-20 left-20"
							><XIcon /></button
						>
					</div>
				</div>
			{/if}
			<div class="flex-row flex pt-2 pl-1">
				{#if vidList.length != 0}
					<label
						class="btn btn-square btn-disabled btn-outline btn-xs variant-filled-surface h-8 w-8"
					>
						<ImageAddFilled />
					</label>
				{:else}
					<label
						class="btn btn-square btn-neutral btn-outline btn-xs variant-filled-surface h-8 w-8"
					>
						<ImageAddFilled />
						<input
							id="image-files"
							type="file"
							class="hidden"
							accept="image/*"
							bind:this={picInput}
							bind:files={picFiles}
							on:change={onPicChange}
						/>
					</label>
				{/if}

				<div class="pl-1" />

				{#if picList.length != 0}
					<label
						class="btn btn-square btn-disabled btn-outline btn-xs variant-filled-surface h-8 w-8"
					>
						<VideoAdd />
					</label>
				{:else}
					<label
						class="btn btn-square btn-neutral btn-outline btn-xs variant-filled-surface h-8 w-8"
					>
						<VideoAdd />
						<input
							id="video-files"
							type="file"
							class="hidden"
							accept="video/mp4,video/x-m4v,video/*"
							bind:this={videoInput}
							bind:files={vidFiles}
							on:change={onVidChange}
						/>
					</label>{/if}

				<div class="pl-1" />
				<div
					on:click={toggleLink}
					class="btn btn-square btn-neutral btn-outline btn-xs variant-filled-surface h-8 w-8"
				>
					<LinkIcon />
				</div>
				<div class="grow" />
				<button
					type="button"
					on:click={createPost}
					class="btn btn-primary btn-sm justify-self-end h-10 w-20"
					>Post
				</button>
			</div>
		</form>
	</div>
</div>
