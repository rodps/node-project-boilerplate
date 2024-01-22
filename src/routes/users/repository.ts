import prisma from '@/db'
import { type CreateUserData } from './schemas/create-user.schema'
import { type User } from '@prisma/client'

const saveUser = async (data: CreateUserData): Promise<User> => {
  return await prisma.user.create({
    data
  })
}

const findUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      email
    }
  })
}

export { saveUser, findUserByEmail }
