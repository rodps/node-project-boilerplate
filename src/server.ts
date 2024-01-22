import app from '.'
import env from './config/env'

const server = app.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT}`)
})

export default server
