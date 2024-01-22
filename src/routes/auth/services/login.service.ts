import { comparePassword } from '@/libs/hash-password'
import { generateToken } from '@/libs/jwt'
import { findUserByEmail } from '@/routes/users/repository'
import ApiError from '@/utils/api-error'
import httpStatus from 'http-status'

const loginService = async (email: string, password: string): Promise<string> => {
  const user = await findUserByEmail(email)
  if (user == null) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
  }
  const isPasswordValid = await comparePassword(password, user.password)
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials')
  }

  return generateToken({ id: user.id })
}

export default loginService
