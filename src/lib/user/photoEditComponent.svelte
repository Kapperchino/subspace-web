<script lang="ts">
	import PhotoIcon from '~icons/material-symbols/add-photo-alternate';
	import XIcon from '~icons/bx/x';

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
			picInput.value = '';
		}
	}
</script>

{#if picList != null && picList.length > 0}
	<div class="flex-row flex pb-1 pt-3 justify-center">
		<div class="relative rounded-full">
			<img loading="lazy" class="object-scale-down rounded-full h-36 w-36 p-1" src={picList.at(0)?.[0]} />
			<div class="pl-1" />
			<button
				type="button"
				on:click={closeImage}
				class="absolute btn btn-xs btn-circle btn-error h-6 w-6 bottom-28 left-28"><XIcon /></button
			>
		</div>
	</div>
	<div class="flex flex-row justify-center pt-3">
		<button type="button" class="btn btn-info btn-sm">Upload</button>
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
