import { Types } from 'mongoose'
import { Field, InputType, ObjectType } from 'type-graphql'

import { User } from '@entities/User/User'

@InputType()
export class LoginInput {
  @Field()
  username!: string

  @Field()
  password!: string
}

@ObjectType()
export class LoginResponse extends User {
  // @Field()
  // id!: Types.ObjectId

  @Field()
  token!: string
}
