import { NextFunction, Request, Response } from 'express'
import { userService } from './user.service'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ...user } = req.body
    const result = await userService.createUser(user)
    console.log(result)

    res.status(200).json({
      success: true,
      messase: 'user created successfully',
      data: result
    })
  } catch (error) {
    // res.status(400).json({
    //   succes: false,
    //   massage: 'user not create'
    // })
    next(error)
    // console.log(error)
  }
}
export const userController = {
  createUser
}
