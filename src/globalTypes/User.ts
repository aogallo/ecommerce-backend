import { Types } from 'mongoose'
import TimestampsFields from './TimestampsFields'
import { Field, ID, ObjectType } from 'type-graphql'
import { type Ref, prop } from '@typegoose/typegoose'
import { Role } from '@entities/Roles/Roles'

@ObjectType()
export default class User extends TimestampsFields {
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
  roles?: Array<Ref<Role>>
}
