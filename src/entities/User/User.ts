import { Types } from 'mongoose'
import {
  type Ref,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'

import { Role } from '@entities/Roles/Roles'
import TimestampsFields from '@src/globalTypes/TimestampsFields'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@ObjectType()
export class User extends TimestampsFields {
  @Field((type) => ID)
  id!: Types.ObjectId

  @Field()
  @prop()
  username!: string

  @Field()
  @prop()
  name!: string

  @Field()
  @prop()
  email!: string

  @prop()
  password!: string

  @Field((type) => [Role], { nullable: true })
  @prop({ ref: () => Role })
  roles!: Array<Ref<Role>>
}

export const UserModel = getModelForClass(User)
