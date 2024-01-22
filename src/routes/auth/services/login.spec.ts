import * as repository from '@/routes/users/repository'
import * as hashPassword from '@/libs/hash-password'
import * as jwt from '@/libs/jwt'
import loginService from './login.service'
import ApiError from '@/utils/api-error'

jest.mock('@/routes/users/repository')
jest.mock('@/libs/hash-password')
jest.mock('@/libs/jwt')

describe('loginService', () => {
  it('should throw an error if user not found', async () => {
    // Arrange
    const email = 'a@a.com'
    const password = '123'
    const findUserByEmailSpy = jest
      .spyOn(repository, 'findUserByEmail')
      .mockResolvedValueOnce(null)

    // Act
    await expect(async () => await loginService(email, password))
      .rejects.toThrow(ApiError)

    // Assert
    expect(findUserByEmailSpy).toHaveBeenCalledWith(email)
  })

  it('should throw an error if password is invalid', async () => {
    // Arrange
    const email = 'a@a.com'
    const password = '123'
    const findUserByEmailSpy = jest
      .spyOn(repository, 'findUserByEmail')
      .mockResolvedValueOnce({
        name: 'John Doe',
        email: 'a@a.com',
        password: '123',
        id: 1
      })
    const comparePasswordSpy = jest
      .spyOn(hashPassword, 'comparePassword')
      .mockResolvedValueOnce(false)

    // Act
    await expect(async () => await loginService(email, password))
      .rejects.toThrow(ApiError)

    // Assert
    expect(findUserByEmailSpy).toHaveBeenCalledWith(email)
    expect(comparePasswordSpy).toHaveBeenCalledWith(password, '123')
  })

  it('should return token', async () => {
    // Arrange
    const email = 'a@a.com'
    const password = '123'
    const findUserByEmailSpy = jest
      .spyOn(repository, 'findUserByEmail')
      .mockResolvedValueOnce({
        name: 'John Doe',
        email: 'a@a.com',
        password: '123',
        id: 1
      })
    const comparePasswordSpy = jest
      .spyOn(hashPassword, 'comparePassword')
      .mockResolvedValueOnce(true)
    const generateTokenSpy = jest
      .spyOn(jwt, 'generateToken')
      .mockReturnValueOnce('any_token')

    // Act
    const token = await loginService(email, password)

    // Assert
    expect(findUserByEmailSpy).toHaveBeenCalledWith(email)
    expect(comparePasswordSpy).toHaveBeenCalledWith(password, '123')
    expect(generateTokenSpy).toHaveBeenCalledWith({ id: 1 })
    expect(token).toEqual('any_token')
  })
})
