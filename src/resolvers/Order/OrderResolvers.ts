import { Order, OrderModel } from '@entities/Order/Order'
import { Query, Resolver } from 'type-graphql'

@Resolver(() => Order)
export default class OrderResolvers {
  @Query(() => [Order], { nullable: 'itemsAndList' })
  async orders(): Promise<Order[]> {
    return await OrderModel.find({}).populate('customer')
  }
}
