import { z } from 'zod'

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(3)
})

type CreateUserData = z.infer<typeof createUserSchema>

export { createUserSchema, type CreateUserData }
