{#each { length: 10 } as _, i}
	<div class="flex flex-row pt-2 justify-center mt-2">
		<div class="flex" />
		<div class="grow max-w-md md:max-w-xl">
			<div class="flex flex-col gap-4 grow max-w-md md:max-w-xl">
				<div class="flex gap-4 items-center">
					<div class="skeleton w-16 h-16 rounded-full shrink-0" />
					<div class="flex flex-col gap-4">
						<div class="skeleton h-4 w-20" />
						<div class="skeleton h-4 w-28" />
					</div>
				</div>
				<div class="skeleton h-64 w-full" />
			</div>
		</div>
		<div class="flex" />
	</div>
{/each}
