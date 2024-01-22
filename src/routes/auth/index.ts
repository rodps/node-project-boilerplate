/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type Response, Router } from 'express'
import { loginSchema } from './schemas/login.schema'
import catchErrors from '@/utils/catch-errors'
import loginService from './services/login.service'

const authRouter = Router()

authRouter.post(
  '/auth/login',
  catchErrors(
    async (req: Request, res: Response) => {
      const { email, password } = loginSchema.parse(req.body)
      const token = await loginService(email, password)
      res.json({ token })
    }
  ))

export default authRouter
