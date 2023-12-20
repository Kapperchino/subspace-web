<script lang="ts">
	import { goto } from '$app/navigation';
	import SeoComponent from '$lib/seoComponent.svelte';
	import SignInComponent from '$lib/signInComponent.svelte';
	import { createLabel, melt } from '@melt-ui/svelte';
	import { onMount } from 'svelte';
	import { clickOutsideAction } from 'svelte-legos';

	let modal: HTMLDialogElement | undefined;

	onMount(() => {
		modal?.showModal();
	});

	async function handleClickOutside() {
		await goto('/login');
	}

	const {
		elements: { root }
	} = createLabel();
</script>

<svelte:head>
	<SeoComponent
		title="Subspace Sign up"
		description="Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"
		img={undefined}
	/>
</svelte:head>

<dialog id="my_modal_2" class="modal" bind:this={modal}>
	<div class="modal-box" use:clickOutsideAction on:clickoutside={handleClickOutside}>
		<div class="shrink-0 bg-base-100">
			<form method="POST" action="?/signup">
				<div class="form-control">
					<label class="label" for="display_name" use:melt={$root}>
						<span class="label-text">Display Name</span>
					</label>
					<input
						name="display_name"
						type="text"
						id="display_name"
						placeholder="display name"
						class="input input-bordered"
						required
					/>

					<label class="label" for="user_address">
						<span class="label-text">User Address</span>
					</label>
					<input
						name="user_address"
						id="user_address"
						type="text"
						placeholder="@user"
						class="input input-bordered"
						required
					/>

					<label class="label" for="email">
						<span class="label-text">Email</span>
					</label>
					<input
						name="email"
						type="email"
						id="email"
						placeholder="email"
						class="input input-bordered"
						required
					/>

					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input
						name="password"
						type="password"
						id="password"
						placeholder="password"
						class="input input-bordered"
						required
					/>
					<div class="mt-6">
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
				</div>
			</form>
		</div>
	</div>
</dialog>
<SignInComponent />
