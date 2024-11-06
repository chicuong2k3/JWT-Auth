import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/user-registration-react",
  server: {
    port: 9000
  },
  plugins: [react()],
})
