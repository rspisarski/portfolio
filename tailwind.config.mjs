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
					'light-purple': '#8847c9',
					'purple': '#4d1486',
					'dark-purple': '#18012c',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
	darkMode: ['class', '[data-theme="dark"]'],
}
