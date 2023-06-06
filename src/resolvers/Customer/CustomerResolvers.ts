import { Customer, CustomerModel } from '@entities/Customer/Customer'
import { Arg, Query, Resolver } from 'type-graphql'

@Resolver(() => Customer)
export default class CustomerResolvers {
  @Query((returns) => [Customer], { nullable: 'itemsAndList' })
  async test(): Promise<Customer[]> {
    return await CustomerModel.find({}).populate('roles')
  }
}
