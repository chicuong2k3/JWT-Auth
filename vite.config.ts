import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/JWT-Auth",
  server: {
    port: 9000
  },
  plugins: [react()],
})
