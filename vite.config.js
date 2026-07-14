/// <reference types="vitest/config" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',

    include: [
      'src/**/*.test.{js,jsx,ts,tsx}',
    ],

    exclude: [
      'node_modules/**',
      'e2e/**',
      'tests/**',
      'backend/**',
    ],

    coverage: {
      provider: 'v8',

      include: [
        'src/**/*.{js,jsx,ts,tsx}',
      ],

      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/test/**',
        'src/main.jsx',
        'src/vite-env.d.ts',
      ],
    },
  },
})