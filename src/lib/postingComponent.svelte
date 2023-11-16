<script lang="ts">
	import ImageAddFilled from '~icons/bxs/image-add';
	import VideoAdd from '~icons/bxs/video-plus';
	import LinkIcon from '~icons/bx/link';
	import XIcon from '~icons/bx/x';

	$: hasTitle = false;
	$: hasLink = false;
	let picList: Array<string> = [];
	let picFiles: FileList | undefined;
	let picInput: HTMLInputElement;

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

				console.log(val.type.includes('image'));
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
</script>

<div class="pt-4 flex flex-row">
	<div class="basis-2 md:basis-2/12 lg:basis-1/5 xl:basis-3/12" />
	<div class="card card-compact basis-full md:basis-8/12 lg:basis-3/5 xl:basis-6/12">
		<section class="p-3 col-span-3">
			<form class="grid grid-cols-1" method="POST" action="?/post">
				{#if hasTitle}
					<label class="label">
						<textarea
							class="textarea grid-cols-[auto_1fr_auto]"
							name="Title"
							placeholder="Title(Optional)"
							rows="1"
						/>
					</label>
				{/if}
				{#if hasLink}
					<label class="label">
						<textarea
							class="textarea grid-cols-[auto_1fr_auto]"
							name="Link"
							placeholder="Link(Optional)"
							rows="1"
						/>
					</label>
				{/if}
				<label class="label">
					<textarea
						class="textarea grid-cols-[auto_1fr_auto]"
						name="Post"
						placeholder="Post your thoughts!"
						rows="2"
					/>
				</label>
				<div class="flex-row flex pb-2">
					{#if !hasTitle}
						<div>
							<button
								type="button"
								class="badge-icon bg-gradient-to-br variant-gradient-secondary-tertiary w-12"
								on:click={toggleTitle}
								>+Title
							</button>
						</div>
					{:else}
						<div>
							<button
								type="button"
								class="badge-icon bg-gradient-to-br variant-gradient-error-warning w-12"
								on:click={toggleTitle}
								>-Title
							</button>
						</div>
					{/if}
					<div class="pl-1">
						<button
							type="button"
							class="badge-icon bg-gradient-to-br variant-gradient-secondary-primary w-20"
							>@Subspace
						</button>
					</div>
				</div>
				{#if picList != null && picList.length > 0}
					<div class="flex-row flex pb-1 pt-1">
						<div class="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-md">
							<img class="object-scale-down h-24 w-24 p-1" src={picList.at(0)} />
							<div class="pl-1" />
							<button
								type="button"
								on:click={closeImage}
								class="absolute btn-icon variant-filled-error h-6 w-6 bottom-20 left-20"
								><XIcon /></button
							>
						</div>
					</div>
				{/if}
				<div class="flex-row flex">
					<label class="btn-icon variant-filled-surface h-8 w-8">
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
					<div class="pl-1" />
					<label class="btn-icon variant-filled-surface h-8 w-8">
						<VideoAdd />
						<input type="file" class="hidden" accept="video/mp4,video/x-m4v,video/*" />
					</label>
					<div class="pl-1" />
					<button
						type="button"
						on:click={toggleLink}
						class="btn-icon variant-filled-surface h-8 w-8"><LinkIcon /></button
					>
					<div class="grow" />
					<button type="submit" class="btn variant-filled-surface w-18 h-8 justify-self-end"
						>Post
					</button>
				</div>
			</form>
		</section>
	</div>

	<div class="basis-2 md:basis-2/12 lg:basis-1/5 xl:basis-3/12" />
</div>
