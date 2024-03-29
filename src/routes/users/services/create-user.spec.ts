import ApiError from '@/utils/api-error'
import createUserService from './create-user.service'
import * as repository from '../repository'
import * as hashPassword from '@/libs/hash-password'

jest.mock('../repository')
jest.mock('@/libs/hash-password')

const findUserByEmailSpy = jest.spyOn(repository, 'findUserByEmail')
const hashPasswordSpy = jest.spyOn(hashPassword, 'hashPassword')
const saveUserSpy = jest.spyOn(repository, 'saveUser')

describe('createUserService', () => {
  it('should throw an error if user already exists', async () => {
    // Arrange
    const data = {
      name: 'John Doe',
      email: 'a@a.com',
      password: '123'
    }
    findUserByEmailSpy.mockResolvedValueOnce({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123',
      id: 1
    })

    // Act
    const promise = createUserService(data)

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
    saveUserSpy.mockResolvedValueOnce({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123',
      id: 1
    })

    // Act
    await createUserService(data)

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
    saveUserSpy.mockResolvedValueOnce({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123',
      id: 1
    })

    // Act
    const user = await createUserService(data)

    // Assert
    expect(user).toEqual({
      name: 'John Doe',
      email: 'a@a.com',
      password: '123',
      id: 1
    })
  })
})
