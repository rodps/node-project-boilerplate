const env = {
  PORT: process.env.PORT ?? 3000,
  JWT_SECRET: process.env.JWT_SECRET ?? 'secret'
}

export default env
