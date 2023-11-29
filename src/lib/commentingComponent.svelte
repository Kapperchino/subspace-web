<script lang="ts">
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import XIcon from '~icons/bx/x';
	import { lazyLoadImageAction, textareaAutosizeAction } from 'svelte-legos';
	import {
		ContentType,
		type FileUploadRequest,
		type PictureMeta,
		type PictureRequestMeta,
		type Post,
		type PostCreation,
		type VideoMeta
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
	import PostCardMetaComponent from './postCardMetaComponent.svelte';
	import CommentMetaComponent from './commentMetaComponent.svelte';
	import type { Comment, CommentRequest } from '../models/comment.type';
	import { createCommentClient } from '../service/commentingService';

	$: hasLink = false;

	export let imgHeight: number = 500;
	export let imgMinHeight: number = 300;

	let picList: Array<[string, File]> = [];
	let vidList: Array<[string, File]> = [];
	let picFiles: FileList | undefined;
	let vidFiles: FileList | undefined;
	let picInput: HTMLInputElement;
	let videoInput: HTMLInputElement;
	let commentReq: CommentRequest = {
		poster_id: 0,
		post_id: 0,
		body: '',
		content: '',
		parent_id: 0,
		content_type: ContentType.Text
	};

	export let onSuccess = () => {}; // no-operation function;

	export let post: Post | undefined;
	export let comment: Comment | undefined;

	function resetPost() {
		commentReq = {
			poster_id: 0,
			post_id: 0,
			body: '',
			content: '',
			parent_id: 0,
			content_type: ContentType.Text
		};
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

	export function getDimention(meta: PictureMeta | undefined) {
		const ratio = meta!.width / meta!.height;
		var height = Math.min(imgHeight, meta!.height);
		height = Math.max(imgMinHeight, height);
		const width = height * ratio;
		return {
			width: width,
			height: height
		};
	}

	async function createComment(e: Event) {
		if (commentReq.body == '') {
			toast.error('Empty comment is not allowed!', {
				icon: '❌',
				position: 'bottom-center',
				style: 'border-radius: 300px; background: oklch(var(--b3)); color: oklch(var(--er));'
			});
			return;
		}
		const user: UserMeta = coockieStore.getValue('cookie');
		commentReq.poster_id = user.user_id;
		const fileIds: number[] = [];
		if (commentReq.content_type === ContentType.Picture) {
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
		} else if (commentReq.content_type === ContentType.Video) {
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

		if (comment != undefined) {
			commentReq.parent_id = comment.id;
			commentReq.post_id = comment.post_id;
		}
		if (post != undefined) {
			commentReq.parent_id = 1;
			commentReq.post_id = post.id;
		}
		//at this point everything should be uploaded
		// commentReq.file_ids = fileIds;
		await createCommentClient(commentReq);
		resetPost();
		toast.success('Comment Successful!', {
			icon: '🎉',
			position: 'bottom-center',
			style: 'border-radius: 200px; background: oklch(var(--b3)); color: oklch(var(--su));'
		});
		onSuccess();
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

{#if post != undefined}
	<div class="card card-compact shadow-lg bg-base-100">
		<div class="card-body">
			<div class="flex-row flex">
				<div><PostCardMetaComponent {post} spaceId={post.space_id} /></div>
			</div>
			{#if post?.topic != ''}
				<a
					class="card-title"
					href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post?.id}"
					data-sveltekit-noscroll
				>
					<h3>
						{post?.topic}
					</h3>
				</a>
			{/if}
			{#if post?.body != ''}
				<a href="/s/{post?.space_parent_id}/{post?.space_id}/p/{post?.id}" data-sveltekit-noscroll>
					<section class="p-2 break-words subpixel-antialiased">
						{post?.body}
					</section>
				</a>
			{/if}
			{#if post?.post_pictures != null}
				<div class="flex justify-center">
					<div class="basis-1/4 rounded-md bg-gradient-to-r from-gray-900 to-gray-800" />
					<img
						loading="lazy"
						class="rounded-md"
						alt="The project logo"
						height={getDimention(post?.post_pictures?.at(0)).height}
						width={getDimention(post?.post_pictures?.at(0)).width}
						src={'https://subspace.place/cdn-cgi/image/fit=scale-down,width=550,format=auto/' +
							post?.post_pictures?.at(0)?.url}
					/>

					<div class="basis-1/4 rounded-md bg-gradient-to-l from-gray-900 to-gray-800" />
				</div>
			{/if}
			{#if post?.post_videos != null}
				{#await import('./video/VideoPlayer.svelte') then { default: Player }}
					<svelte:component
						this={Player}
						src={post.post_videos[0].url}
						thumbnail={post?.post_videos[0].thumbnail}
						title={post.topic ?? 'video'}
					/>
				{/await}
			{/if}
		</div>
	</div>
{/if}

{#if comment != undefined}
	<div class="card card-compact shadow-lg bg-base-100 hover:cursor-pointer">
		<div class="card-body">
			<div class="flex-row flex">
				<div><CommentMetaComponent {comment} /></div>
			</div>

			{#if comment?.body != ''}
				<section class="p-2 break-words subpixel-antialiased">
					{comment?.body}
				</section>
			{/if}
		</div>
	</div>
{/if}

<div class="card card-compact flex shadow-lg bg-base-200 grow max-w-xl mt-2">
	<div class="card-body">
		<form method="POST" action="?/post">
			{#if hasLink}
				<label class="label">
					<textarea
						class="textarea textarea-md textarea-accent textarea-bordered w-full grid-cols-[auto_1fr_auto]"
						name="Link"
						placeholder="Link(Optional)"
						rows="1"
					/>
				</label>
			{/if}
			<label class="label">
				<textarea
					use:textareaAutosizeAction
					class="textarea textarea-md textarea-primary textarea-bordered w-full grid-cols-[auto_1fr_auto]"
					name="Comment"
					placeholder="Comment here!"
					bind:value={commentReq.body}
					autofocus
				/>
			</label>
			{#if picList != null && picList.length > 0 && vidList.length == 0}
				<div class="flex-row flex pb-1 pt-3">
					<div class="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-md">
						<img
							class="object-scale-down h-24 w-24 p-1"
							data-src={picList.at(0)?.[0]}
							alt="image thumbnail"
						/>
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
				<button
					type="button"
					on:click={toggleLink}
					class="btn btn-square btn-neutral btn-outline btn-xs variant-filled-surface h-8 w-8"
				>
					<LinkIcon />
				</button>
				<div class="grow" />
				<button
					type="button"
					on:click={createComment}
					class="btn btn-secondary btn-sm justify-self-end h-10 w-20"
					>Comment
				</button>
			</div>
		</form>
	</div>
</div>
