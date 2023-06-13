import { sign } from 'jsonwebtoken'

import { type Employee } from '@entities/Employee/Employee'

const DEV_EXPIRES_IN = '15d'
const PROD_EXPIRES_IN = '15m'

export const createToken = (user: Employee): string => {
  const expiresIn =
    process.env.NODE_ENV === 'prod' ? PROD_EXPIRES_IN : DEV_EXPIRES_IN
  return sign(
    {
      id: user.id,
      username: user.username,
      roles: user.roles,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn,
    },
  )
}
