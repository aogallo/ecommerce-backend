import { Arg, Mutation, Resolver } from 'type-graphql'

import { type User, UserModel } from '@entities/User/User'
import { LoginInput, LoginResponse } from '@resolvers/types/LoginTypes'
import CustomError from '@src/utils/CustomError'
import { comparePassword } from '@src/utils/PasswordUtil'
import { createToken } from '@src/utils/TokenUtil'

@Resolver()
export class LoginResolvers {
  @Mutation((types) => LoginResponse)
  async login(
    @Arg('login') { username, password }: LoginInput,
  ): Promise<LoginResponse> {
    const user = await UserModel.findOne({ username }).populate('roles')

    console.log(user)
    console.log(username, password)

    if (user === undefined || user === null) {
      CustomError({
        code: 'AUTHENTICATIONFAILD',
        message: 'Usuario o contraseña incorrectos',
      })
    }

    const isMatch = await comparePassword(password, user?.password ?? '')

    if (!isMatch) {
      CustomError({
        code: 'AUTHENTICATIONFAILD',
        message: 'Usuario o contraseña incorrectos',
      })
    }

    const token = createToken(user as User)

    return {
      token,
      id: user?.id,
      updatedAt: user?.updatedAt ?? '',
      password: user?.password ?? '',
      createdAt: user?.createdAt ?? '',
      name: user?.name ?? '',
      email: user?.email ?? '',
      roles: user?.roles ?? [],
      username: user?.username ?? '',
    }
  }
}
