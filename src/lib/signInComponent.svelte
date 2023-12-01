<script lang="ts">
	import { createLabel, melt } from '@melt-ui/svelte';

	const {
		elements: { root }
	} = createLabel();
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content flex-col lg:flex-row-reverse lg:pl-6">
		<div class="text-center lg:text-left lg:ml-6">
			<h1 class="text-5xl font-bold">Subspace</h1>
			<p class="py-6">Welcome to Subspace Beta!</p>
		</div>
		<div class="card shrink-0 w-96 max-w-md shadow-2xl bg-base-100">
			<form class="card-body" method="POST" action="?/login">
				<div class="flex flex-col">
					<label for="email" class="label" use:melt={$root}>
						<span class="label-text">Email</span>
					</label>
					<input
						name="email"
						id="email"
						type="email"
						placeholder="email"
						class="input input-bordered"
						required
					/>
					<label for="password" class="label" use:melt={$root}>
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
					<a href="#" class="label-text-alt link link-hover pt-2">Forgot password?</a>
				</div>
				<div class="form-control mt-3">
					<button class="btn btn-primary" type="submit">Login</button>
				</div>
				<div class="divider">or</div>
				<div class="form-control">
					<a class="btn btn-info shadow-md shadow-info" href="/signup">Join us!</a>
				</div>
			</form>
		</div>
	</div>
</div>
