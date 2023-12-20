<script lang="ts">
	import SeoComponent from "$lib/seoComponent.svelte";
	import SignInComponent from "$lib/signInComponent.svelte";

</script>

<svelte:head>
	<SeoComponent
		title="Subspace Login"
		description="Subspace is a social network for people to hang out with thier communities, there's a subspace for anything that you're intrested in, and if not, go create it!"
		img={undefined}
	/>
</svelte:head>

<SignInComponent></SignInComponent>
