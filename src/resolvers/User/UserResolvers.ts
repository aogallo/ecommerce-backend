import { Arg, Mutation, InputType, Query, Field, Resolver } from 'type-graphql'

import { UserModel, User } from '@entities/User/User'
import { RoleModel } from '@entities/Roles/Roles'

@InputType()
class UserInput implements Partial<User> {
  @Field()
  username!: string

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string
}

@Resolver((of) => User)
export default class UserResolver {
  @Query((returns) => [User], { nullable: 'itemsAndList' })
  async users(): Promise<User[]> {
    return await UserModel.find({}).populate('roles')
  }

  @Query((returns) => String, { nullable: true })
  async user(@Arg('id') id: string): Promise<string> {
    return ''
  }

  @Mutation((returns) => User)
  async createUser(@Arg('user') user: UserInput): Promise<User | undefined> {
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
    }
  }
}
