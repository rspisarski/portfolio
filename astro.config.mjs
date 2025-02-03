// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind()
  ],
  build: {
    assets: 'static'
  },
  vite: {
    ssr: {
      noExternal: ['react-icons']
    },
    resolve: {
      preserveSymlinks: true
    },
    optimizeDeps: {
      exclude: ['@astrojs/react']
    }
  }
});