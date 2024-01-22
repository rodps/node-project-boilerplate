import request from 'supertest'
import app from '@/index'

describe('GET /users/:id', () => {
  it('should return status 200', async () => {
    // Arrange
    const responsePost = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    })
    const userId = responsePost.body.id

    // Act
    const response = await request(app).get(`/users/${userId}`).expect(200)

    // Assert
    expect(response.body.name).toBe('John Doe')
    expect(response.body.email).toBe('a@a.com')
    expect(response.body.id).toBe(userId)
    expect(response.body.password).toBeUndefined()
  })

  it('should return status 404 if user not found', async () => {
    // Arrange
    const userId = 999

    // Act & Assert
    await request(app).get(`/users/${userId}`).expect(404)
  })
})
