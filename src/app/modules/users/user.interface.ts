export type IUser = {
  userId?: string
  name: {
    firstName: string
    middleName?: string
    lastName: string
  }
  email: string
  password: string
  contact: string
  gender: string
  dateOfBirth: string
  CreatedAt?: string
  Updatedat?: string
}
