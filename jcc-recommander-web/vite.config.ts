import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 让 "@/xxx" 指向 src 目录
    },
  },
})
