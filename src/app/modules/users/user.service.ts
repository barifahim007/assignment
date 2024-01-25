import { IUser } from './user.interface'
import { User } from './user.model'
import { autogeneratedId } from './user.utls'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const generetedId = await autogeneratedId()
  user.userId = generetedId

  console.log(user)

  const createUser = await User.create(user)

  if (!createUser) {
    throw new Error('failed to create user')
  }
  return createUser
}

export const userService = {
  createUser
}
