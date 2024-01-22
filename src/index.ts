import express from 'express'
import cors from 'cors'
import env from '@/config/env'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const server = app.listen(env.PORT, () => { console.log(`Listening on port ${env.PORT}`) })

export default server
