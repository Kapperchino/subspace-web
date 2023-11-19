<script lang="ts">
	import Home from '~icons/bx/home';
	import Search from '~icons/bx/search';
	import Satellite from '~icons/material-symbols/satellite-alt-outline-sharp';
	import Bell from '~icons/material-symbols/notifications';
	import PostingComponent from './postingComponent.svelte';
	import { invalidateAll } from '$app/navigation';
	let modal: HTMLDialogElement | undefined;

	function startPost() {
		modal?.showModal();
	}

	var onSuccess = async () => {
		await invalidateAll();
		modal?.close();
	};
</script>

<div class="drawer-side">
	<label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay lg:hidden" />
	<ul class="menu p-4 w-60 min-h-full bg-base-200">
		<!-- Sidebar content here -->
		<a href="/home">
			<li>
				<div class=" join">
					<div class="text-lg">
						<Home />
					</div>
					<div class="flex text-lg">Home</div>
				</div>
			</li></a
		>

		<a href="/explore">
			<li>
				<div class=" join">
					<div class="text-lg">
						<Search />
					</div>
					<div class="flex text-lg">Explore</div>
				</div>
			</li></a
		>

		<a href="/spaces">
			<li>
				<div class=" join">
					<div class="text-lg">
						<Satellite />
					</div>
					<div class="flex text-lg">Space</div>
				</div>
			</li></a
		>

		<a href="/notifications">
			<li>
				<div class="join">
					<div class="text-lg">
						<Bell />
					</div>
					<div class="flex text-lg">Notifications</div>
				</div>
			</li></a
		>
		<div class="btn btn-primary btn-sm h-12 mt-3" on:click={startPost}>
			<div class="text-lg flex flex-row">Post</div>
		</div>
	</ul>
</div>

<dialog id="my_modal_2" class="modal" bind:this={modal}>
	<div class="modal-box bg-primary-content">
		<div class="grow">
			<PostingComponent onSuccess={onSuccess} />
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
