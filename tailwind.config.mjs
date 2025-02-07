/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				brand: {
					'light-purple': '#2d1e39',
					'purple': '#9b43dd',
					'dark-purple': '#160e1c',
					'dark-theme-bg': '#110C15',
					'dark-theme-text': '#fefbff',
					'light-theme-bg': '#fefbff',
					'light-theme-text': '#110C15',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
	darkMode: ['class', '[data-theme="dark"]'],
}
