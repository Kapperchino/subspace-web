<script lang="ts">
	import PhotoIcon from '~icons/material-symbols/add-photo-alternate';
	import XIcon from '~icons/bx/x';
	import type { FileUploadRequest, PictureRequestMeta } from '../../models/post.type';
	import { uploadFile, uploadMedia } from '../../service/postingService';
	import { backendUrl } from '$lib/store/clientBackendUrl';
	import { number } from 'zod';
	import { addToast } from '$lib/toaster.svelte';
	import type { UserMeta } from '../../models/signup.type';
	import { coockieStore } from '$lib/store/tokenStore';
	import { goto } from '$app/navigation';

	export let onSuccess = () => {}; // no-operation function;


	let picList: Array<[string, File]> = [];
	let picFiles: FileList | undefined;
	let picInput: HTMLInputElement;

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

	function closeImage() {
		if (picList.length > 0) {
			picList.pop();
			picList = picList;
		}
	}

	async function upload() {
		const user: UserMeta = coockieStore.getValue('cookie');
		if (user == undefined) {
			await goto('/login');
			return;
		}
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
		var res = await updateUserPic(picRes.id);
		uploadSuccess();
		reset();
		onSuccess();
	}

	async function updateUserPic(pictureId: number) {
		const user: UserMeta = coockieStore.getValue('cookie');
		const data: Response = await fetch(`${backendUrl}/users/${user.user_id}/picture`, {
			method: 'PUT',
			body: JSON.stringify({ picture_id: pictureId }),
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${user?.token}`
			}
		});
		return await data;
	}

	function uploadSuccess() {
		addToast({
			data: {
				title: 'Success',
				description: '🎉 Profile update Success!',
				type: 'success'
			}
		});
	}

	function reset() {
		closeImage();
	}
</script>

{#if picList != null && picList.length > 0}
	<div class="flex-row flex pb-1 pt-3 justify-center">
		<div class="relative rounded-full">
			<img
				loading="lazy"
				class="object-scale-down rounded-full h-36 w-36 p-1"
				src={picList.at(0)?.[0]}
			/>
			<div class="pl-1" />
			<button
				type="button"
				on:click={closeImage}
				class="absolute btn btn-xs btn-circle btn-error h-6 w-6 bottom-28 left-28"><XIcon /></button
			>
		</div>
	</div>
	<div class="flex flex-row justify-center pt-3">
		<button type="button" class="btn btn-info btn-sm" on:click={upload}>Upload</button>
	</div>
{:else}
	<div class="flex flex-row justify-center">
		<label class="btn btn-circle btn-primary btn-xl h-36 w-36">
			<div class="w-36 h-36 rounded-full bg-primary absolute">
				<div class="text-5xl left-11 top-11 text-info-content relative">
					<PhotoIcon />
					<input
						id="image-files"
						type="file"
						class="hidden"
						accept="image/*"
						bind:this={picInput}
						bind:files={picFiles}
						on:change={onPicChange}
					/>
				</div>
			</div>
		</label>
	</div>
{/if}
