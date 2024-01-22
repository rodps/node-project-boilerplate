import getUserService from './get-user.service'
import * as repository from '../repository'
import ApiError from '@/utils/api-error'

jest.mock('../repository')

describe('getUserService', () => {
  it('should throw an error if user not found', async () => {
    // Arrange
    const id = 1
    const findUserByIdSpy = jest
      .spyOn(repository, 'findUserById')
      .mockResolvedValueOnce(null)

    // Act
    const promise = getUserService(id)

    // Assert
    expect(findUserByIdSpy).toHaveBeenCalledWith(id)
    await expect(promise).rejects.toThrow(ApiError)
  })

  it('should return user', async () => {
    // Arrange
    const id = 1
    const user = {
      name: 'John Doe',
      email: 'a@a.com',
      password: '123',
      id
    }
    const findUserByIdSpy = jest
      .spyOn(repository, 'findUserById')
      .mockResolvedValueOnce(user)

    // Act
    const result = await getUserService(id)

    // Assert
    expect(findUserByIdSpy).toHaveBeenCalledWith(id)
    expect(result).toEqual(user)
  })
})
