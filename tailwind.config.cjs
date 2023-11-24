module.exports = {
	content: ["./src/**/*.{html,js,svelte}"], theme: {
		extend: {},
	},
	daisyui: {
		themes: ["light", "dark", "cupcake"],
	},
	plugins: [
		require("daisyui"),
		require('vidstack/tailwind.cjs')
	],
	experimental: {
		optimizeUniversalDefaults: true
	}
}