import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), 
    tailwindcss()],
    resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser', // Previous fix
      '@aws-sdk/util-user-agent-browser': '@aws-sdk/util-user-agent-browser/dist-es/index.js' // The new, required fix
    },
  },
  define: {
    global: {}, // Previous fix
  }
})
