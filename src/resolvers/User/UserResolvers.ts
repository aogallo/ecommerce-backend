import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import { UserModel, User } from '@entities/User/User'
import { RoleModel } from '@entities/Roles/Roles'
import { UserInput } from '@resolvers/types/UserTypes'
import CustomError from '@src/utils/CustomError'

@Resolver(() => User)
export default class UserResolver {
  @Query(() => [User], { nullable: 'itemsAndList' })
  async users(): Promise<User[]> {
    return await UserModel.find({}).populate('roles')
  }

  @Query(() => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | null> {
    return await UserModel.findById(id).populate('roles')
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Arg('user') user: UserInput): Promise<User | null> {
    try {
      const roleAdmin = await RoleModel.findOne({ name: 'admin' })
      const newModel = await UserModel.create({
        ...user,
        roles: [roleAdmin?.id],
      })
      const newUser = await newModel.save()
      return await newUser.populate('roles')
    } catch (error) {
      console.log('erro', error)
      CustomError({ code: 'FAILDTODOOPERATION' })
    }
    return null
  }
}
