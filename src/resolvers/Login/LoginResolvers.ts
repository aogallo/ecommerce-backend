import { Arg, Mutation, Resolver } from 'type-graphql'

import { LoginInput, LoginResponse } from '@resolvers/types/LoginTypes'
import CustomError from '@src/utils/CustomError'
import { comparePassword } from '@src/utils/PasswordUtil'
import { createToken } from '@src/utils/TokenUtil'
import { type Employee, EmployeeModel } from '@entities/Employee/Employee'
import { CustomerModel } from '@entities/Customer/Customer'

@Resolver()
export class LoginResolvers {
  @Mutation(() => LoginResponse)
  async login(
    @Arg('login') { username, password }: LoginInput,
  ): Promise<LoginResponse> {
    let user = await EmployeeModel.findOne({ username }).populate('roles')

    if (user === undefined || user === null) {
      user = await CustomerModel.findOne({ username }).populate('roles')
    }

    const isMatch = await comparePassword(password, user?.password ?? '')

    if (!isMatch) {
      CustomError({
        code: 'AUTHENTICATIONFAILD',
        message: 'Usuario o contraseña incorrectos',
      })
    }

    const token = createToken(user as Employee)

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
