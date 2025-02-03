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
    build: {
      rollupOptions: {
        external: ['react', 'react-dom']
      }
    }
  }
});