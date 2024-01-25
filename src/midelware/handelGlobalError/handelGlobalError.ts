import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../shared/interface/interface'
import handelValidationError from '../../errors/handelValidationError'
import ApiError from '../../errors/apiError'
import config from '../../config'

const handelGlobalError: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 400
  let message = 'something went wrong'
  let errorMessage: IGenericErrorMessage[] = []
  console.log('hey I am from global error handler', error)

  if (error?.name === 'ValidationError') {
    const simpifiedError = handelValidationError(error)
    statusCode = simpifiedError.statusCode
    message = simpifiedError.message
    errorMessage = simpifiedError.errorMesage
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: '',
            message: error?.message
          }
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : undefined
  })
  next()
}

export default handelGlobalError
