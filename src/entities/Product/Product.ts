import { Field, ID, ObjectType, GraphQLISODateTime } from 'type-graphql'
import { Types } from 'mongoose'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import TimestampsFields from '@src/globalTypes/TimestampsFields'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@ObjectType()
export class Product extends TimestampsFields {
  @Field(() => ID)
  id!: Types.ObjectId

  @Field()
  @prop()
  name!: string

  @Field()
  @prop({ unique: true })
  type!: string

  @Field()
  @prop({ required: false })
  description!: string

  @Field((type) => GraphQLISODateTime)
  @prop()
  dateToPublish!: string
}

export const ProductModel = getModelForClass(Product)
