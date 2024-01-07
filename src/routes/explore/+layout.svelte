<script lang="ts">
	import { goto } from '$app/navigation';

	// Most of your app wide CSS should be put in this file
	import { page } from '$app/stores';
	import FooterComponent from '$lib/footerComponent.svelte';
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
	import SideBar from '$lib/sidebar/sideBar.svelte';
	import { blur } from 'svelte/transition';

	let term: string;
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex flex-row grow pt-3">
			<div class="pl-3 flex grow">
				<form method="POST" action="?/search">
					<div class="form-control flex shrink">
						<input
							name="search"
							type="text"
							bind:value={term}
							placeholder="Search"
							class="input w-40 sm:w-auto input-bordered flex"
						/>
					</div>
				</form>
			</div>
			<div class="flex grow" />
			<div class="pt-1 pl-3 flex">
				<div class="flex tabs tabs-boxed tabs-md">
					<a class="tab tab-active" href="/home">Trending</a>
					<a class="tab" href="/news">News</a>
				</div>
			</div>
		</div>
	</svelte:fragment>
	<svelte:fragment slot="content">
		<div><slot /></div>
	</svelte:fragment>
</ShellComponent>
