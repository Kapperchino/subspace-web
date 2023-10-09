<script lang="ts">
	import { signup } from '../../service/loginService.d.ts';
	import type { SignUp } from '../../models/signup.type';
	export const signupData: SignUp = {
		display_name: '',
		user_address: '',
		email: '',
		password: ''
	};
</script>

<div class="flex flex-row">
	<div class="basis-1/12 md:basis-1/4" />
	<div class="card p-8 col-span-3 basis-10/12 md:basis-2/4">
		<div class="grid grid-cols-1 gap-4">
			<label class="label">
				<span>Display Name</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					id="display-name"
					type="text"
					placeholder="Display Name"
					on:change={(e) => (signupData.display_name = e.currentTarget.value)}
				/>
			</label>
			<label class="label">
				<span>User @</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					id="username"
					type="text"
					placeholder="User @"
					on:change={(e) => (signupData.user_address = e.currentTarget.value)}
				/>
			</label>
			<label class="label">
				<span>Email</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					id="email"
					type="email"
					placeholder="Email"
					on:change={(e) => (signupData.email = e.currentTarget.value)}
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					id="password"
					type="password"
					placeholder="Password"
					on:change={(e) => (signupData.password = e.currentTarget.value)}
				/>
			</label>
			<label class="label">
				<span>Confirm Password</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					id="c-password"
					type="password"
					placeholder="Confirm Password"
				/>
			</label>
			<button
				type="button"
				class="btn variant-filled-surface mt-5 w-32 justify-self-end"
				on:click={async () => await signup(signupData)}>Submit</button
			>
		</div>
	</div>
	<div class="basis-1/12 md:basis-1/4" />
</div>
