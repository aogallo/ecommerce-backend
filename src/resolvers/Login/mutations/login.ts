import { users } from '../../../data'
import jwt from 'jsonwebtoken'

interface LoginInput {
  username: string
  password: string
}

interface Users {
  id: string
  name: string
  email: string
  username: string
  password: string
  roles: string[]
  permissions: string[]
}

export const login = (
  parent: string,
  { username, password }: LoginInput,
): string => {
  const userAtuh = {
    id: '12345',
    name: 'Gene Kranz',
    email: 'gene@nasa.gov',
    username: 'gene',
    password: 'password123!',
    roles: ['director'],
    permissions: ['read:any_user', 'read:own_user'],
  }

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
