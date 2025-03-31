// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/practica-frontend/', // 👈 esto es importante
  plugins: [react()],
})
