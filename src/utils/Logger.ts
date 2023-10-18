import { createLogger, transports, format } from 'winston'

const devFormat = format.combine(
  // format.align(),
  // format.cli(),
  // format.timestamp(),
  format.splat(),
  format.prettyPrint({ colorize: true }),
  format.colorize({ all: true }),
  format.errors({ stack: true }),
  format.simple(),
)

export const logger = createLogger({
  level: 'info',
  format: process.env.NODE_ENV !== 'production' ? devFormat : format.json(),
  // defaultMeta: { service: 'user-service' },
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    }),
  )
}
