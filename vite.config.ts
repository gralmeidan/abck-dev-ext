import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  build: {
    rollupOptions: {
      input: {
        devtools: 'src/devtools/index.html',
        panel: 'src/devtools/panel/index.html',
      },
    },
  },
});
