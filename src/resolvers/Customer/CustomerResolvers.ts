import { Customer, CustomerModel } from '@entities/Customer/Customer'
import { RoleModel } from '@entities/Roles/Roles'
import { CustomerInput } from '@resolvers/types/CustomerTypes'
import { MyContext } from '@src/server'
import CustomError from '@src/utils/CustomError'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(() => Customer)
export default class CustomerResolvers {
  @Query((returns) => [Customer], { nullable: 'itemsAndList' })
  async customers(): Promise<Customer[]> {
    return await CustomerModel.find({}).populate('roles')
  }

  @Mutation(() => Customer, { nullable: true })
  async createCustomer(
    @Arg('customer') user: CustomerInput,
    @Ctx() ctx: MyContext,
  ): Promise<Customer | null> {
    try {
      const customerRole = await RoleModel.findOne({ name: 'customer' })

      if (customerRole == null) {
        ctx.logger?.error('Not Found Customer Role')
        CustomError({ code: 'FAILDTODOOPERATION' })
      }

      const newModel = await CustomerModel.create({
        ...user,
        roles: [customerRole?.id],
      })

      const newCustomer = await newModel.save()

      return await newCustomer.populate('roles')
    } catch (error) {
      ctx.logger?.log(
        'error',
        'Error to create customer %s',
        JSON.stringify(error),
      )
      CustomError({ code: 'FAILDTODOOPERATION' })
    }
    return null
  }
}
