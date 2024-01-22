import ApiError from '@/utils/api-error'
import { type User } from '@prisma/client'
import httpStatus from 'http-status'
import { findUserById } from '../repository'

const getUserService = async (id: number): Promise<User> => {
  const user = await findUserById(id)
  if (user == null) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  return user
}

export default getUserService
