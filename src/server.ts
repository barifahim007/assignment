import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger } from './shared/logger/logger'
import { Server } from 'http'

// handel uncaught Exception
process.on('uncaughtException', error => {
  logger.errLogger.error(`uncaughtException pakar saleko khopri tor.. `, error)
  process.exit(1)
})

let server: Server

async function main() {
  try {
    await mongoose.connect(config.databse_url as string)
    logger.inforLogger.info(`database connected sucessfully`)
    server = app.listen(config.port, () => {
      logger.inforLogger.info(`Application listening on port ${config.port}`)
    })
  } catch (err) {
    logger.errLogger.error(`databse not connected ${err}`)
  }
  // unhandled Rejection  gracefully server trun off
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        logger.errLogger.error(`unhandeled Rejection ${error}`)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()
// SIGTERM process....
process.on('SIGTERM', () => {
  logger.inforLogger.info('sigterm caught')
  if (server) {
    server.close()
  }
})
// console.log(MRX)
