import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/';
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      includeAssets: ['logo.svg'],
      manifest: {
        name: 'Jot It',
        short_name: 'Jot It',
        description: 'Jot It - Notes in Markdown',
        theme_color: '#059669',
        icons: [
          {
            src: 'logo.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: 'logo.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
