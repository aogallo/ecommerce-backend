import User from '@src/globalTypes/User'
import { encriptPassword } from '@src/utils/PasswordUtil'
import {
  getModelForClass,
  modelOptions,
  post,
  prop,
} from '@typegoose/typegoose'
import { Field, ObjectType } from 'type-graphql'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@post<Customer>('save', async function () {
  this.password = await encriptPassword(this.password)
})
@ObjectType()
export class Customer extends User {
  @Field()
  @prop({ required: true })
  deliveryAddress!: string
}

export const CustomerModel = getModelForClass(Customer)
