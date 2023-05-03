import { startStandaloneServer } from '@apollo/server/standalone'

import { type IncomingMessage } from 'http'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'
import { type UserToken, server } from './server'

dotenv.config()

export const getUser = (req: IncomingMessage): UserToken | null => {
  try {
    const tokenWithBearer = req.headers.authorization ?? ''
    const token = tokenWithBearer.split(' ')[1]
    const JWT_SECRET_VALUE: jwt.Secret = process.env.JWT_SECRET as string

    if (token === '') {
      return null
    }

    const verifyToken: jwt.JwtPayload = jwt.verify(
      token,
      JWT_SECRET_VALUE,
    ) as JwtPayload

    const { userInfo, iat, exp, sub } = verifyToken

    if (exp == null) {
      return null
    }

    if (Date.now() >= exp * 1000) {
      return null
    }

    return {
      ...userInfo,
      iat: iat as number,
      exp,
      sub: sub as string,
    }
  } catch (error) {
    return null
  }
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => ({
    user: getUser(req),
  }),
})
  .then(({ url }) => {
    console.log(`Server listening at: ${url} 🐳`)
  })
  .catch(() => {
    console.log(`Error in servers`)
  })
