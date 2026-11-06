/**
 * DEVOPS-10 — Unit test for src/routes/auto/boom.route.js.
 * Imports the router directly and calls the GET /boom handler with a stub `next`,
 * to check the error it forwards to the global error handler.
 */
import { describe, it, expect } from 'vitest'
import router, { BOOM_STATUS, BOOM_MESSAGE } from '../../src/routes/auto/boom.route.js'

function getBoomHandler () {
  const layer = router.stack.find(l => l.route?.path === '/boom')
  return layer.route.stack[0].handle
}

describe('boom.route', () => {
  it('registers a GET /boom route', () => {
    const layer = router.stack.find(l => l.route?.path === '/boom')
    expect(layer).toBeDefined()
    expect(layer.route.methods.get).toBe(true)
  })

  it('forwards an Error with status 500 and message "Boom!" to next()', () => {
    let forwarded
    getBoomHandler()({}, {}, (err) => { forwarded = err })
    expect(forwarded).toBeInstanceOf(Error)
    expect(forwarded.status).toBe(BOOM_STATUS)
    expect(forwarded.status).toBe(500)
    expect(forwarded.message).toBe(BOOM_MESSAGE)
  })
})
