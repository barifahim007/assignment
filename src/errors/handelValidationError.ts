import mongoose from 'mongoose'
import {
  IGenericErrorMessage,
  IGenericErrorResponse
} from '../shared/interface/interface'

const handelValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const validatError: IGenericErrorMessage[] = Object.values(err?.errors).map(
    (elm: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: elm?.path,
        message: elm?.message
      }
    }
  )

  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error!',
    errorMesage: validatError
  }
}

export default handelValidationError
