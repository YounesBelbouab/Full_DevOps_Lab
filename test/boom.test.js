/**
 * DEVOPS-10 — Integration test for GET /boom.
 * Ensures the global error handler shapes the response.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('GET /boom', () => {
  it('returns 500 with error payload', async () => {
    const res = await request(app).get('/boom')
    expect(res.status).toBe(500)
    expect(res.body.error).toBe(true)
    expect(typeof res.body.message).toBe('string')
  })

  it('responds with JSON { error: true, message: "Boom!" }', async () => {
    const res = await request(app).get('/boom')
    expect(res.headers['content-type']).toMatch(/application\/json/)
    expect(res.body).toEqual({ error: true, message: 'Boom!' })
  })

  it('does not break other routes after an error', async () => {
    await request(app).get('/boom')
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
  })
})
