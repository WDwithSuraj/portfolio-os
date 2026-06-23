import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // react-draggable (via react-rnd) reads process.env, which is undefined in the
  // browser; shim it so window dragging doesn't throw in dev.
  define: {
    'process.env': {},
  },
})
