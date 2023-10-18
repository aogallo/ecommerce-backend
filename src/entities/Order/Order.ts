import { Field, ID, ObjectType } from 'type-graphql'
import { Types } from 'mongoose'
import {
  type Ref,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose'
import TimestampsFields from '@src/globalTypes/TimestampsFields'
import { Product } from '@entities/Product/Product'
// import { Customer } from '@entities/Customer/Customer'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@ObjectType()
export class Order extends TimestampsFields {
  @Field(() => ID)
  id!: Types.ObjectId

  // @Field(() => Customer)
  // @prop({ ref: () => Customer })
  // idCustomer!: Ref<Customer>

  @Field(() => [Product])
  @prop({ ref: () => Product })
  products!: Array<Ref<Product>>
}

export const OrderModel = getModelForClass(Order)
