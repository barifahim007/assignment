import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'

type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    userId: {
      type: String,
      unique: true
    },
    name: {
      firstName: {
        type: String,
        required: true
      },
      middleName: {
        type: String
      },
      lastName: {
        type: String
      }
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    dateOfBirth: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export const User = model<IUser, UserModel>('User', userSchema)
