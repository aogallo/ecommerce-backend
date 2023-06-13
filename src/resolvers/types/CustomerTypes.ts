import { Field, InputType } from 'type-graphql'

import type User from '@src/globalTypes/User'

@InputType()
export class CustomerInput {
  @Field()
  username!: string

  @Field()
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string

  @Field()
  deliveryAddress!: string
}
