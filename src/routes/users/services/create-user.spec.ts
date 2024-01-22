import ApiError from '@/utils/api-error'
import CreateUserService from './create-user.service'

jest.mock('../repository')
jest.mock('@/libs/hash-password')

const repository = jest.requireMock('../repository')
const hashPassword = jest.requireMock('@/libs/hash-password')

const findUserByEmailSpy = jest.spyOn(repository, 'findUserByEmail')
const hashPasswordSpy = jest.spyOn(hashPassword, 'hashPassword')
const saveUserSpy = jest.spyOn(repository, 'saveUser')

describe('CreateUserService', () => {
  it('should throw an error if user already exists', async () => {
    // Arrange
    const data = {
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    }
    findUserByEmailSpy.mockResolvedValueOnce(data)

    // Act
    const promise = CreateUserService(data)

    // Assert
    expect(findUserByEmailSpy).toHaveBeenCalledWith(data.email)
    await expect(promise).rejects.toThrow(ApiError)
  })

  it('should save user with password hashed', async () => {
    // Arrange
    const data = {
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    }
    findUserByEmailSpy.mockResolvedValueOnce(null)
    hashPasswordSpy.mockResolvedValueOnce('any_hash')
    saveUserSpy.mockResolvedValueOnce(data)

    // Act
    await CreateUserService(data)

    // Assert
    expect(hashPasswordSpy).toHaveBeenCalledWith(data.password)
    expect(saveUserSpy).toHaveBeenCalledWith({ ...data, password: 'any_hash' })
  })

  it('should return saved user', async () => {
    // Arrange
    const data = {
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    }
    findUserByEmailSpy.mockResolvedValueOnce(null)
    hashPasswordSpy.mockResolvedValueOnce('any_hash')
    saveUserSpy.mockResolvedValueOnce(data)

    // Act
    const user = await CreateUserService(data)

    // Assert
    expect(user).toEqual(data)
  })
})
