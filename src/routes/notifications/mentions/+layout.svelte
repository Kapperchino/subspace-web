<script lang="ts">
	import ShellComponent from '$lib/shellComponent.svelte';
	import PhoneSideBarButton from '$lib/sidebar/phoneSideBarButton.svelte';
</script>

<ShellComponent>
	<svelte:fragment slot="navbar">
		<PhoneSideBarButton />
		<div class="flex grow" />
		<div class="backdrop-blur bg-base-300">
			<div class=" bottom-10 tabs tabs-boxed tabs-md flex">
				<a class="tab" href="/notifications/all">All</a>
				<a class="tab tab-active" href="/notifications/mentions">Mentions</a>
			</div>
		</div>
		<div class="flex grow" />
	</svelte:fragment>
	<svelte:fragment slot="content">
		<slot />
	</svelte:fragment>
</ShellComponent>
