import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/modules/users/user.route'
import handelGlobalError from './midelware/handelGlobalError/handelGlobalError'

const app: Application = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application router
app.use('/api/v1/user', router)

// global error handeler
app.use(handelGlobalError)

app.get('/', (req: Request, res: Response) => {
  res.send('hello world !')
})

export default app
