import { Types } from 'mongoose'
import {
  type Ref,
  getModelForClass,
  modelOptions,
  prop,
  post,
} from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'

import { Role } from '@entities/Roles/Roles'
import TimestampsFields from '@src/globalTypes/TimestampsFields'
import { encriptPassword } from '@src/utils/PasswordUtil'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@post<User>('save', async function () {
  this.password = await encriptPassword(this.password)
})
@ObjectType()
export class User extends TimestampsFields {
  @Field(() => ID)
  id!: Types.ObjectId

  @Field()
  @prop({ unique: true })
  username!: string

  @Field()
  @prop({ unique: true })
  name!: string

  @Field()
  @prop({ unique: true })
  email!: string

  @prop({ required: true })
  password!: string

  @Field(() => [Role], { nullable: true })
  @prop({ ref: () => Role })
  roles!: Array<Ref<Role>>
}

export const UserModel = getModelForClass(User)
