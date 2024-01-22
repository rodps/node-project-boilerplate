import ApiError from './api-error'

const catchErrors = (fn: (req: any, res: any, next: any) => Promise<void>) => async (req: any, res: any, next: any) => {
  try {
    await fn(req, res, next)
  } catch (error) {
    handleError(error, res)
  }
}

const handleError = (error: any, res: any): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ error: error.message })
  } else {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default catchErrors
