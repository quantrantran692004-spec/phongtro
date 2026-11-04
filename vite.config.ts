import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // GitHub Pages serves this project from /phongtro/; keep local development at /.
  base: process.env.GITHUB_ACTIONS ? '/phongtro/' : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
    strictPort: false,
    open: false,
  },
});
