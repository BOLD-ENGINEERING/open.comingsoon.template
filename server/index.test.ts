import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { app } from './index'

describe('Server Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status with 200', async () => {
      const response = await request(app).get('/health')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('status', 'ok')
      expect(response.body).toHaveProperty('timestamp')
      expect(response.body).toHaveProperty('uptime')
    })

    it('should return valid ISO timestamp', async () => {
      const response = await request(app).get('/health')
      const timestamp = new Date(response.body.timestamp)

      expect(timestamp.toISOString()).toBeDefined()
    })
  })

  describe('GET /api/status', () => {
    it('should return API status with 200', async () => {
      const response = await request(app).get('/api/status')

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Server is running')
      expect(response.body).toHaveProperty('service', 'Coming Soon Template API')
      expect(response.body).toHaveProperty('version', '1.0.0')
    })
  })

  describe('404 Handler', () => {
    it('should return 404 for undefined routes', async () => {
      const response = await request(app).get('/undefined-route')

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('error', 'Not Found')
      expect(response.body).toHaveProperty('path', '/undefined-route')
      expect(response.body).toHaveProperty('method', 'GET')
    })

    it('should return 404 for POST to undefined routes', async () => {
      const response = await request(app).post('/api/nonexistent')

      expect(response.status).toBe(404)
      expect(response.body.method).toBe('POST')
    })
  })

  describe('Request Headers', () => {
    it('should accept JSON content-type', async () => {
      const response = await request(app)
        .get('/api/status')
        .set('Content-Type', 'application/json')

      expect(response.status).toBe(200)
    })
  })
})
