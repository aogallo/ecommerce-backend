import { Field, InputType } from 'type-graphql'

import type User from '@src/globalTypes/User'

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  username!: string

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string
}
