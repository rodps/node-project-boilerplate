import env from '@/config/env'
import jwtoken from 'jsonwebtoken'

interface JwtPayload {
  id: number
}

const generateToken = (payload: JwtPayload): string => {
  return jwtoken.sign(payload, env.JWT_SECRET, { expiresIn: '1d' })
}

const verifyToken = (token: string): JwtPayload => {
  return jwtoken.verify(token, env.JWT_SECRET) as JwtPayload
}

export { generateToken, verifyToken, type JwtPayload }
