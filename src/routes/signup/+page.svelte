<script lang="ts">
	import { goto } from '$app/navigation';
	import SignInComponent from '$lib/signInComponent.svelte';
	import { onMount } from 'svelte';
	import { clickOutsideAction } from 'svelte-legos';

	let modal: HTMLDialogElement | undefined;

	onMount(() => {
		modal?.showModal();
	});

	async function handleClickOutside() {
		await goto('/login');
	}
</script>

<dialog id="my_modal_2" class="modal" bind:this={modal}>
	<div class="modal-box" use:clickOutsideAction on:clickoutside={handleClickOutside}>
		<div class="shrink-0 bg-base-100">
			<form method="POST" action="?/signup">
				<div class="form-control">
					<label class="label">
						<span class="label-text">Display Name</span>
					</label>
					<input
						name="display_name"
						type="text"
						placeholder="display name"
						class="input input-bordered"
						required
					/>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">User Address</span>
					</label>
					<input
						name="user_address"
						type="text"
						placeholder="@user"
						class="input input-bordered"
						required
					/>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">Email</span>
					</label>
					<input
						name="email"
						type="email"
						placeholder="email"
						class="input input-bordered"
						required
					/>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text">Password</span>
					</label>
					<input
						name="password"
						type="password"
						placeholder="password"
						class="input input-bordered"
						required
					/>
				</div>
				<div class="form-control mt-6">
					<button class="btn btn-info" type="submit">Sign up</button>
				</div>

				<dialog id="my_modal_2" class="modal" bind:this={modal}>
					<div class="modal-box">
						<h3 class="font-bold text-lg">Hello!</h3>
						<p class="py-4">Press ESC key or click outside to close</p>
					</div>
					<form method="dialog" class="modal-backdrop">
						<button>close</button>
					</form>
				</dialog>
			</form>
		</div>
	</div>
</dialog>
<SignInComponent />
