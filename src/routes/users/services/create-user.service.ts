import { type User } from '@prisma/client'
import { type CreateUserData } from '../schemas/create-user.schema'
import { findUserByEmail, saveUser } from '../repository'
import ApiError from '@/utils/api-error'
import httpStatus from 'http-status'
import { hashPassword } from '@/libs/hash-password'

const CreateUserService = async (data: CreateUserData): Promise<User> => {
  const doesUserExist = await findUserByEmail(data.email)
  if (doesUserExist != null) {
    throw new ApiError(httpStatus.CONFLICT, 'User already exists')
  }
  const password = await hashPassword(data.password)
  return await saveUser({ ...data, password })
}

export default CreateUserService
