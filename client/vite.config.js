import { defineConfig } from 'vite'
import process from 'node:process'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { portfolioQuery } from './src/sanity/portfolioQuery.js'

const projectId = process.env.VITE_SANITY_PROJECT_ID || 'm32es5ry'
const dataset = process.env.VITE_SANITY_DATASET || 'production'
const apiVersion = process.env.VITE_SANITY_API_VERSION || '2026-07-06'

const sanityPortfolioMiddleware = () => ({
  name: 'sanity-portfolio-middleware',
  configureServer(server) {
    server.middlewares.use('/api/portfolio', async (_request, response) => {
      try {
        const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`)
        url.searchParams.set('query', portfolioQuery)

        const sanityResponse = await fetch(url)

        if (!sanityResponse.ok) {
          response.statusCode = sanityResponse.status
          response.end(JSON.stringify({ message: 'Unable to load portfolio content.' }))
          return
        }

        const payload = await sanityResponse.json()

        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(payload.result))
      } catch (error) {
        server.config.logger.error(error)
        response.statusCode = 500
        response.end(JSON.stringify({ message: 'Unable to load portfolio content.' }))
      }
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [sanityPortfolioMiddleware(), react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
