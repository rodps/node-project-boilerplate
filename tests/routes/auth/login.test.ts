import request from 'supertest'
import app from '@/index'

describe('POST /auth/login', () => {
  it('should return status 200', async () => {
    // Arrange
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    })

    // Act
    const response = await request(app).post('/auth/login').send({
      email: 'a@a.com',
      password: '123'
    })

    // Assert
    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined()
  })

  it('should return status 401 if user not found', async () => {
    // Act
    const response = await request(app).post('/auth/login').send({
      email: 'notfoundemail@a.com',
      password: '123'
    })

    // Assert
    expect(response.status).toBe(401)
  })

  it('should return status 401 if password is invalid', async () => {
    // Arrange
    await request(app).post('/users').send({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    })

    // Act
    const response = await request(app).post('/auth/login').send({
      email: 'a@a.com',
      password: 'invalid'
    })

    // Assert
    expect(response.status).toBe(401)
  })
})
