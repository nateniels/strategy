// File: vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Ensure the base path is set to the root
  base: '/', 
  plugins: [react()],
});