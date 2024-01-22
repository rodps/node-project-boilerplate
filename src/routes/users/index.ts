/* eslint-disable @typescript-eslint/no-misused-promises */
import catchErrors from '@/utils/catch-errors'
import { type Request, type Response, Router } from 'express'
import { createUserSchema } from './schemas/create-user.schema'
import createUserService from './services/create-user.service'
import { getUserSchema } from './schemas/get-user.schema'
import getUserService from './services/get-user.service'

const usersRouter = Router()

usersRouter.post(
  '/users',
  catchErrors(
    async (req: Request, res: Response) => {
      const data = createUserSchema.parse(req.body)
      const user = await createUserService(data)
      res.status(201).json(user)
    })
)

usersRouter.get(
  '/users/:id',
  catchErrors(
    async (req: Request, res: Response) => {
      const { id } = getUserSchema.parse(req.params)
      const user = await getUserService(id)
      res.json({
        name: user.name,
        email: user.email,
        id: user.id
      })
    }
  )
)

export default usersRouter
