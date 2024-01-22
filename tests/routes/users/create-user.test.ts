import app from '@/index'
import request from 'supertest'

describe('POST /users', () => {
  it('should return status 201', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    })
      .expect(201)
      .expect('Content-Type', /json/)

    expect(response.body.name).toBe('John Doe')
    expect(response.body.email).toBe('a@a.com')
  })

  it('should return status 409 if user already exists', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    })
    expect(response.status).toBe(409)
    expect(response.body.error).toBe('User already exists')
  })

  it('should return status 400', async () => {
    const response = await request(app).post('/users').send({})
    expect(response.status).toBe(400)
  })
})
