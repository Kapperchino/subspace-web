<script lang="ts">
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import XIcon from '~icons/bx/x';
	import { textareaAutosizeAction } from 'svelte-legos';

	$: hasTitle = false;
	$: hasLink = false;
	let picList: Array<string> = [];
	let vidList: Array<string> = [];
	let picFiles: FileList | undefined;
	let vidFiles: FileList | undefined;
	let picInput: HTMLInputElement;
	let videoInput: HTMLInputElement;

	async function onPicChange(e: Event) {
		console.log(picFiles);
		if (picFiles != undefined) {
			for (let i = 0; i < picFiles.length; i++) {
				const val = picFiles.item(i)!;
				const reader = new FileReader();
				reader.onload = (e) => {
					picList.push(e.target!.result!.toString());
					picList = picList;
				};
				reader.readAsDataURL(val);
			}
		}
	}

	async function onVidChange(e: Event) {
		console.log(vidFiles);
		if (vidFiles != undefined) {
			for (let i = 0; i < vidFiles.length; i++) {
				const val = vidFiles.item(i)!;
				const reader = new FileReader();
				reader.onload = (e) => {
					vidList.push(e.target!.result!.toString());
					vidList = vidList;
				};
				reader.readAsDataURL(val);
			}
		}
	}

	function toggleTitle() {
		hasTitle = !hasTitle;
	}

	function toggleLink() {
		hasLink = !hasLink;
	}

	function closeImage() {
		picList.pop();
		picList = picList;
		picInput.value = '';
	}

	function closeVideo() {
		vidList.pop();
		vidList = vidList;
		videoInput.value = '';
	}
</script>

<div class="flex flex-row pt-2 justify-center">
	<div class="flex" />
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
						/>
					</label>
				{/if}
				<label class="label">
					<textarea
						use:textareaAutosizeAction
						class="textarea textarea-md textarea-primary textarea-bordered w-full grid-cols-[auto_1fr_auto]"
						name="Post"
						placeholder="Post here!"
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
							<img class="object-scale-down h-24 w-24 p-1" src={picList.at(0)} />
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
							<video class="object-scale-down clip-thumbnail h-24 w-24 p-1" src={vidList.at(0)} />
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
					<button type="submit" class="btn btn-primary btn-sm justify-self-end h-10 w-20"
						>Post
					</button>
				</div>
			</form>
		</div>
	</div>

	<div class="flex" />
</div>
