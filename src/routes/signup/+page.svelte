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

<div class="grid justify-items-center mt-60">
	<label class="label">
		<span>Display Name</span>
		<input
			class="input-group w-80 h-7 pl-3 pb-1"
			id="display-name"
			type="text"
			placeholder="Display Name"
			on:change={(e) => (signupData.display_name = e.currentTarget.value)}
		/>
	</label>
	<label class="label">
		<span>User @</span>
		<input
			class="input-group w-80 h-7 pl-3 pb-1"
			id="username"
			type="text"
			placeholder="User @"
			on:change={(e) => (signupData.user_address = e.currentTarget.value)}
		/>
	</label>
	<label class="label">
		<span>Email</span>
		<input
			class="input-group w-80 h-7 pl-3 pb-1"
			id="email"
			type="email"
			placeholder="Email"
			on:change={(e) => (signupData.email = e.currentTarget.value)}
		/>
	</label>
	<label class="label">
		<span>Password</span>
		<input
			class="input-group w-80 h-7 pl-3 pb-1"
			id="password"
			type="password"
			placeholder="Password"
			on:change={(e) => (signupData.password = e.currentTarget.value)}
		/>
	</label>
	<label class="label">
		<span>Confirm Password</span>
		<input
			class="input-group w-80 h-7 pl-3 pb-1"
			id="c-password"
			type="password"
			placeholder="Confirm Password"
		/>
	</label>
	<button
		type="button"
		class="btn variant-filled-surface mt-5 w-40 ml-40"
		on:click={async () => await signup(signupData)}>Submit</button
	>
</div>
