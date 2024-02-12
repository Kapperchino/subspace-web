<script lang="ts">
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import XIcon from '~icons/bx/x';
	import {
		ContentType,
		type FileUploadRequest,
		type PictureRequestMeta,
		type Post
	} from '../../models/post.type';
	import { coockieStore } from '../store/tokenStore';
	import type { UserMeta } from '../../models/signup.type';
	import { processVideo, uploadFile, uploadMedia } from '../../service/postingService';

	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';
	import Mention from '@tiptap/extension-mention';
	import { mentionRenderer } from '../mention/mentionRenderer';
	import { prefixSearchTags, prefixSearchUsers } from '../../service/searchService';
	import { PluginKey } from '@tiptap/pm/state';
	import { hashTagsRenderer } from '../hashtags/hashTagRenderer';
	import { addToast } from '../toaster.svelte';
	import type { Comment, CommentRequest } from '../../models/comment.type';
	import { createCommentClient } from '../../service/commentingService';

	let picList: Array<[string, File]> = [];
	let vidList: Array<[string, File]> = [];
	let picFiles: FileList | undefined;
	let vidFiles: FileList | undefined;
	let picInput: HTMLInputElement;
	let videoInput: HTMLInputElement;

	export let post: Post | undefined;
	export let comment: Comment | undefined;

	let parentId = () => {
		if (comment) {
			return comment.id;
		}
		return 1;
	};

	let postId = () => {
		if (post) {
			return post.id;
		}
		if (comment) {
			return comment.post_id;
		}
		return -1;
	};

	let commentReq: CommentRequest = {
		parent_id: parentId(),
		poster_id: 0,
		post_id: postId(),
		body: '',
		content_type: ContentType.Text,
		file_ids: []
	};

	export let onSuccess = () => {}; // no-operation function;

	function resetComment() {
		commentReq = {
			parent_id: parentId(),
			poster_id: 0,
			post_id: postId(),
			body: '',
			content_type: ContentType.Text,
			file_ids: []
		};
		editor?.commands.clearContent(true);
		closeImage();
		closeVideo();
	}

	async function checkAuth() {
		const user: UserMeta = coockieStore.getValue('cookie');
		if (user == undefined) {
			await goto('/login');
			return;
		}
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

	async function createComment(e: Event) {
		if (vidList != null && vidList.length > 0) {
			commentReq.content_type = ContentType.Video;
		} else if (picList != null && picList.length > 0) {
			commentReq.content_type = ContentType.Picture;
		}
		if (vidList.length == 0 && picList.length == 0 && editor?.isEmpty) {
			createEmptyPost();
			return;
		}
		const user: UserMeta = coockieStore.getValue('cookie');
		if (user == undefined) {
			await goto('/login');
			return;
		}
		commentReq.poster_id = user?.user_id;
		commentReq.body = editor?.getHTML() ?? '';

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
			var uploadRes = await uploadFile(picList[0][1], picRes.presigned, picList[0][1].type);
			fileIds.push(picRes.id);
		} else if (commentReq.content_type === ContentType.Video) {
			const fileUploadReq: FileUploadRequest = {
				picture_meta: undefined,
				file_type: 'video',
				is_link: undefined
			};
			var videoRes = await uploadMedia(fileUploadReq);
			var uploadRes = await uploadFile(vidList[0][1], videoRes.presigned, vidList[0][1].type);
			var videoProcess = await processVideo(videoRes.id);
			fileIds.push(videoRes.id);
		}
		//at this point everything should be uploaded
		commentReq.file_ids = fileIds;
		try {
			const res = await createCommentClient(commentReq);
			if (res.status == 401) {
				await goto('/login');
				return;
			}
		} catch (error) {
			console.log(error);
		}
		resetComment();
		createSuccess();
		onSuccess();
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

	let editor: Editor | undefined;
	let editorDiv: HTMLElement;

	function createSuccess() {
		addToast({
			data: {
				title: 'Success',
				description: '🎉 Post successful!',
				type: 'success'
			}
		});
	}

	function createEmptyPost() {
		addToast({
			data: {
				title: 'Warning',
				description: '❌ Empty post not allowed!',
				type: 'error'
			}
		});
	}

	onMount(() => {
		const hashtagPlugin = Mention.extend({
			name: 'hashtagPlugin'
		}).configure({
			suggestion: {
				char: '#',
				pluginKey: new PluginKey('suggestionOne'),
				items: async (e) => {
					if (e.query == '') {
						return [];
					}
					return await prefixSearchTags(e.query);
				},
				render: hashTagsRenderer
			},
			HTMLAttributes: {
				class: 'text-primary font-semi-bold hashtags'
			}
		});
		editor = new Editor({
			element: editorDiv,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: 'Comment here!',
					emptyEditorClass:
						'cursor-text text-xl before:content-[attr(data-placeholder)] before:absolute  before:opacity-70 before-pointer-events-none'
				}),
				Mention.configure({
					suggestion: {
						items: async (e) => {
							if (e.query == '') {
								return [];
							}
							return await prefixSearchUsers(e.query);
						},
						render: mentionRenderer
					},
					HTMLAttributes: {
						class: 'text-primary font-semi-bold mentions'
					}
				}),
				hashtagPlugin
			],
			editorProps: {
				attributes: {
					class: 'prose dark:prose-invert prose-base focus:outline-none'
				}
			}
		});
	});

	onDestroy(() => {
		editor?.destroy();
	});
</script>

<div class="card card-compact flex shadow-lg bg-base-300 grow">
	<div class="card-body">
		<form method="POST" action="?/post">
			<label class="label">
				<div
					bind:this={editorDiv}
					class="tiptap textarea textarea-md textarea-bordered textarea-primary w-full cursor-text"
					on:click={() => {
						editor?.chain().focus().run();
					}}
				/>
			</label>

			{#if picList != null && picList.length > 0 && vidList.length == 0}
				<div class="flex-row flex pb-1 pt-3">
					<div class="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-md">
						<img class="object-scale-down h-24 w-24 p-1" src={picList.at(0)?.[0]} />
						<div class="pl-1" />
						<button
							type="button"
							on:click={closeImage}
							class="absolute btn btn-xs btn-circle btn-error h-6 w-6 bottom-20 left-20"
						>
							<XIcon />
						</button>
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
				<div class="grow" />
				<button
					type="button"
					on:click={createComment}
					class="btn btn-primary btn-sm justify-self-end h-10 w-20"
					>Comment
				</button>
			</div>
		</form>
	</div>
</div>
