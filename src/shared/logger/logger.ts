import { createLogger, format, transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'

const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  return `${date.toDateString()} ${hour}${minutes}${seconds} [${label}] ${level}: ${message}`
})

const inforLogger = createLogger({
  level: 'info',
  format: combine(label({ label: 'yeah hoo !' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    // new transports.File({ filename: 'success.log', level: 'info' }),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'oxford-%DATE%-success.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      level: 'info',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
})

const errLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'bad request!' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'error',
        'oxford-%DATE%-error.log'
      ),
      datePattern: 'YYYY-MM-DD-HH',
      level: 'error',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
})

export const logger = {
  inforLogger,
  errLogger
}
