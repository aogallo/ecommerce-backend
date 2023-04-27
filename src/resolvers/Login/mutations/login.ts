import { users } from '../../../data'
import jwt from 'jsonwebtoken'

interface LoginInput {
  username: string
  password: string
}

export const login = (
  parent: string,
  { username, password }: LoginInput,
): string => {
  const userAtuh = users.filter((user) => user.username === username)[0]

  return jwt.sign(
    {
      userInfo: {
        roles: userAtuh.roles,
        permissions: userAtuh.permissions,
      },
    },
    'SUPER_SECRET',
    { algorithm: 'HS256', subject: userAtuh.id, expiresIn: '1d' },
  )
}

export default {
  Mutation: {
    login,
  },
}
