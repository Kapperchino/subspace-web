module.exports = {
	content: ["./src/**/*.{html,js,svelte}"], theme: {
		extend: {
			colors: {
				'media-brand': 'rgb(var(--media-brand) / <alpha-value>)',
				'media-focus': 'rgb(var(--media-focus) / <alpha-value>)',
			},
		},
		future: {
			hoverOnlyWhenSupported: true,
		},
	},
	daisyui: {
		themes: ["light", "dark"],
	},
	plugins: [
		require("daisyui"),
		require('tailwindcss-animate'),
		require('vidstack/tailwind.cjs')({
			prefix: 'media',
			webComponents: true,
		}),
	],
	experimental: {
		optimizeUniversalDefaults: true
	}
}

function customVariants({ addVariant, matchVariant }) {
	// Strict version of `.group` to help with nesting.
	matchVariant('parent-data', (value) => `.parent[data-${value}] > &`);

	addVariant('hocus', ['&:hover', '&:focus-visible']);
	addVariant('group-hocus', ['.group:hover &', '.group:focus-visible &']);
}