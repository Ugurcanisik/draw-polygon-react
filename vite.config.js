import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import alias from '@rollup/plugin-alias'

const path = require('path');

export default defineConfig({
  server: {
    port: 8080,
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
    ],
  },
  build: {
    outDir: 'build'
  },
  plugins: [
    alias(),
    react(),
  ],
})
