import server from '@/index'

afterAll(() => {
  server.close()
})
