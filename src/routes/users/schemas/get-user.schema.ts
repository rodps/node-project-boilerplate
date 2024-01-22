import { z } from 'zod'

const getUserSchema = z.object({
  id: z.coerce.number()
})

export { getUserSchema }
