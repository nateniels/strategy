// File: vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // THIS IS THE CRITICAL FIX for Vercel/CSS path issues
  base: '/', 
  plugins: [react()],
});