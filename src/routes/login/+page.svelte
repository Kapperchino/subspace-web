<div class="flex flex-row">
	<div class="basis-1/12 md:basis-1/4" />
	<div class="card basis-10/12 md:basis-2/4">
		<section class="p-8 col-span-3">
			<form class="grid grid-cols-1 gap-4" method="POST" action="?/login">
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
				<button type="submit" class="btn variant-filled-surface mt-5 w-32 justify-self-end"
					>Login
				</button>
			</form>
		</section>
	</div>

	<div class="basis-1/12 md:basis-1/4" />
</div>
