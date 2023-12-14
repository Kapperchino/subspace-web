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
		themes: ["light", {
			'dark': {
				'primary': '#9061f5',
				'primary-focus': '#793cfb',
				'primary-content': '#ffffff',

				'secondary': '#f339c8',
				'secondary-focus': '#bb2598',
				'secondary-content': '#ffffff',

				'accent': '#3eccbd',
				'accent-focus': '#3ba59a',
				'accent-content': '#ffffff',

				'neutral': '#2a2e37',
				'neutral-focus': '#16181d',
				'neutral-content': '#ffffff',

				'base-100': '#000000',
				'base-200': '#2a2e37',
				'base-300': '#16181d',
				'base-content': '#ebecf0',

				'info': '#66c7ff',
				'success': '#87cf3a',
				'warning': '#e1d460',
				'error': '#ff6b6b',

				'--rounded-box': '1rem',
				'--rounded-btn': '.5rem',
				'--rounded-badge': '1.9rem',

				'--animation-btn': '.25s',
				'--animation-input': '.2s',

				'--btn-text-case': 'uppercase',
				'--navbar-padding': '.5rem',
				'--border-btn': '1px',
			},
		},],
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
		require('vidstack/tailwind.cjs')({
			prefix: 'media',
			webComponents: true,
		}),
		require("daisyui"),
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