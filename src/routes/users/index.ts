/* eslint-disable @typescript-eslint/no-misused-promises */
import catchErrors from '@/utils/catch-errors'
import { type Request, type Response, Router } from 'express'
import { createUserSchema } from './schemas/create-user.schema'
import CreateUserService from './services/create-user.service'

const usersRouter = Router()

usersRouter.post(
  '/users',
  catchErrors(
    async (req: Request, res: Response) => {
      const data = createUserSchema.parse(req.body)
      const user = CreateUserService(data)
      res.status(201).json(user)
    })
)

export default usersRouter
