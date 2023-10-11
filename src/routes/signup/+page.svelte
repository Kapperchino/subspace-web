<script lang="ts">
</script>

<div class="flex flex-row">
	<div class="basis-1/12 md:basis-1/4" />
	<div class="card p-8 col-span-3 basis-10/12 md:basis-2/4 shadow-md">
		<form class="grid grid-cols-1 gap-4" method="POST" action="?/signup">
			<label class="label">
				<span>Display Name</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					name="display_name"
					type="text"
					placeholder="Display Name"
				/>
			</label>
			<label class="label">
				<span>User @</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					name="user_address"
					type="text"
					placeholder="User @"
				/>
			</label>
			<label class="label">
				<span>Email</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					name="email"
					type="email"
					placeholder="Email"
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					name="password"
					type="password"
					placeholder="Password"
				/>
			</label>
			<label class="label">
				<span>Confirm Password</span>
				<input
					class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
					name="c-password"
					type="password"
					placeholder="Confirm Password"
				/>
			</label>
			<button type="submit" class="btn variant-filled-surface mt-5 w-32 justify-self-end">
				Submit
			</button>
		</form>
	</div>
	<div class="basis-1/12 md:basis-1/4" />
</div>
