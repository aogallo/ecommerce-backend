import { users } from '../../../data'
import jwt from 'jsonwebtoken'

interface LoginInput {
  username: string
  password: string
}

export const login = (
  _parent: string,
  { username = '', password = '' }: LoginInput,
): string => {
  const JWT_SECRET_VALUE: jwt.Secret = process.env.JWT_SECRET as string
  const JWT_ALGORITHM_VALUE: jwt.Algorithm = process.env
    .JWT_ALGORITHM as jwt.Algorithm
  const JWT_EXPIRATION_IN: string = process.env.JWT_EXPIRATION_IN as string
  if (username === '' || password === '') {
    return ''
  }

  const userAtuh = users.filter((user) => user.username === username)[0]

  return jwt.sign(
    {
      userInfo: {
        roles: userAtuh.roles,
        permissions: userAtuh.permissions,
      },
    },
    JWT_SECRET_VALUE,
    {
      algorithm: JWT_ALGORITHM_VALUE,
      subject: userAtuh.id,
      expiresIn: JWT_EXPIRATION_IN,
    },
  )
}

export default {
  Mutation: {
    login,
  },
}
