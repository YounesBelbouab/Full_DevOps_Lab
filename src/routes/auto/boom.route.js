/**
 * DEVOPS-10 — GET /boom
 * Simulates a server failure to exercise the global error handler.
 *
 * The route never answers by itself: it builds an Error with an HTTP status
 * and forwards it with next(err). The global errorHandler (src/utils/errorHandler.js)
 * then responds with HTTP 500 and the JSON payload { error: true, message }.
 */
import { Router } from 'express'

export const BOOM_STATUS = 500
export const BOOM_MESSAGE = 'Boom!'

const router = Router()

router.get('/boom', (_req, _res, next) => {
  const err = new Error(BOOM_MESSAGE)
  err.status = BOOM_STATUS
  next(err)
})

export default router
