import server from '@/index'
import { deleteTestData } from './utils'

afterAll(() => {
  server.close()
})

beforeEach(async () => {
  await deleteTestData()
})
