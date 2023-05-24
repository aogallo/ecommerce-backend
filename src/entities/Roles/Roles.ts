import { Field, ID, ObjectType } from 'type-graphql'
import { Types } from 'mongoose'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import TimestampsFields from '@src/globalTypes/TimestampsFields'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@ObjectType()
export class Role extends TimestampsFields {
  @Field(() => ID)
  id!: Types.ObjectId

  @Field()
  @prop({ unique: true })
  name!: string
}

export const RoleModel = getModelForClass(Role)
