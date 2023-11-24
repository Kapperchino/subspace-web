<script lang="ts">
	export let title: string;
	export let description: string;
	export let img: string | undefined;
</script>

<!-- HTML Meta Tags -->
<title>{title}</title>
<meta name="description" content={description} />

<!-- Google / Search Engine Tags -->
<meta itemprop="name" content={title} />
<meta itemprop="description" content={description} />
{#if img != undefined}
	<meta itemprop="image" content={img} />
{:else}
	<meta itemprop="image" content="https://subspaceimg.com/Subspace-Icon-Gradient-Main@2x.jpg" />
{/if}

<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://subspace.place" />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
{#if img != undefined}
	<meta property="og:image" content={img} />
{:else}
	<meta property="og:image" content="https://subspaceimg.com/Subspace-Icon-Gradient-Main@2x.jpg" />
{/if}

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />

{#if img != undefined}
	<meta name="twitter:image" content={img} />
{:else}
	<meta name="twitter:image" content="https://subspaceimg.com/Subspace-Icon-Gradient-Main@2x.jpg" />
{/if}
