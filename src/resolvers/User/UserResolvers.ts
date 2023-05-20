import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import { UserModel, User } from '@entities/User/User'
import { RoleModel } from '@entities/Roles/Roles'
import { UserInput } from '@resolvers/types/UserTypes'
import CustomError from '@src/utils/CustomError'

@Resolver((of) => User)
export default class UserResolver {
  @Query((returns) => [User], { nullable: 'itemsAndList' })
  async users(): Promise<User[]> {
    return await UserModel.find({}).populate('roles')
  }

  @Query((returns) => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | null> {
    return null
  }

  @Mutation((returns) => User, { nullable: true })
  async createUser(@Arg('user') user: UserInput): Promise<User | null> {
    try {
      const roleAdmin = await RoleModel.findOne({ name: 'admin' })
      const newModel = await UserModel.create({
        ...user,
        roles: [roleAdmin?.id],
      })
      console.log('model', newModel)
      const newUser = await newModel.save()
      return await newUser.populate('roles')
    } catch (error) {
      console.log('erro', error)
      CustomError({ code: 'FAILDTODOOPERATION' })
    }
    return null
  }
}
