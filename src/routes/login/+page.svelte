<script lang="ts">
	import { login } from '../../service/loginService.d.ts';
	import type { LogIn } from '../../models/signup.type';
	export const loginData: LogIn = {
		email: '',
		password: ''
	};
</script>

<div class="flex flex-row">
	<div class="basis-1/12 md:basis-1/4" />
	<div class="card p-8 col-span-3 basis-10/12 md:basis-2/4">
		<div class="grid grid-cols-1 gap-4">
			<label class="label">
				<span>Email</span>
				<input
                    class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					id="email"
					type="email"
					placeholder="Email"
					on:change={(e) => (loginData.email = e.currentTarget.value)}
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input
                    class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					id="password"
					type="password"
					placeholder="Password"
					on:change={(e) => (loginData.password = e.currentTarget.value)}
				/>
			</label>
			<button
				type="button"
				class="btn variant-filled-surface mt-5 w-32 justify-self-end"
				on:click={async () => await login(loginData)}
				>Login
			</button>
		</div>
	</div>
    <div class="basis-1/12 md:basis-1/4" />
</div>
