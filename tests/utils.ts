import prisma from '@/db'

const deleteTestData = async (): Promise<void> => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('Not in test environment')
  }
  await prisma.user.deleteMany({})
}

export { deleteTestData }
