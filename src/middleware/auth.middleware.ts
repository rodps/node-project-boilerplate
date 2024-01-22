import { verifyToken } from '@/libs/jwt'
import ApiError from '@/utils/api-error'
import { type NextFunction, type Request, type Response } from 'express'
import httpStatus from 'http-status'

const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization
  if (authHeader == null) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
  }
  if (authHeader.split(' ').length !== 2) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
  }
  if (authHeader.split(' ')[0] !== 'Bearer') {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
  }
  const token = authHeader.split(' ')[1]
  try {
    const { id } = verifyToken(token)
    req.user = { id }
    next()
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token')
  }
}

export default authMiddleware
