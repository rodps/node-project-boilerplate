import { verifyToken } from '@/libs/jwt'
import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization
  if (authHeader == null) {
    res.status(httpStatus.UNAUTHORIZED).json({ error: 'No token provided' })
    return
  }
  if (authHeader.split(' ').length !== 2) {
    res.status(httpStatus.UNAUTHORIZED).json({ error: 'Invalid token' })
    return
  }
  if (authHeader.split(' ')[0] !== 'Bearer') {
    res.status(httpStatus.UNAUTHORIZED).json({ error: 'Invalid token' })
    return
  }
  const token = authHeader.split(' ')[1]
  try {
    const { id } = verifyToken(token)
    req.user = { id }
    next()
  } catch (err) {
    res.status(httpStatus.UNAUTHORIZED).json({ error: 'Invalid token' })
  }
}

export default authMiddleware
