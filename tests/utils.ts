import prisma from '@/db'
import loginService from '@/routes/auth/services/login.service'
import { findUserByEmail } from '@/routes/users/repository'
import createUserService from '@/routes/users/services/create-user.service'
import { type User } from '@prisma/client'

const testUser = {
  name: 'test',
  email: 'test@me.com',
  password: 'test'
}

const getTestUser = async (): Promise<User> => {
  let user = await findUserByEmail(testUser.email)
  if (user == null) {
    user = await createUserService(testUser)
  }
  user.password = testUser.password
  return user
}

const getTestUserToken = async (): Promise<string> => {
  const user = await getTestUser()
  const token = await loginService(user.email, user.password)
  return token
}

const deleteTestData = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Not in test environment')
  }
  await prisma.user.deleteMany({})
}

export { deleteTestData, getTestUser, getTestUserToken }
