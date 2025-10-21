import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set correct base for GitHub Pages when running in Actions
const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
const isCI = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  base: isCI && repoName ? `/${repoName}/` : '/',
  plugins: [react()],
})
