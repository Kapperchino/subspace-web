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
		<div class="flex flex-row justify-start pt-3">
			<div class="pl-3 flex">
				<form method="POST" action="?/search">
					<div class="form-control">
						<input
							name="search"
							type="text"
							bind:value={term}
							placeholder="Search"
							class="input input-bordered"
						/>
					</div>
				</form>
			</div>
			<div class="flex grow"/>
			<div class="pt-1 pl-10 flex">
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
