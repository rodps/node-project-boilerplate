import express from 'express'
import cors from 'cors'
import env from '@/config/env'
import usersRouter from './routes/users'
import authRouter from './routes/auth'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(usersRouter)
app.use(authRouter)

const server = app.listen(env.PORT, () => { console.log(`Listening on port ${env.PORT}`) })

export default server
