import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

import { RoleModel } from '@entities/Roles/Roles'
import { UserInput } from '@resolvers/types/UserTypes'
import CustomError from '@src/utils/CustomError'
import { Employee, EmployeeModel } from '@entities/Employee/Employee'
import { MyContext } from '@src/server'

@Resolver(() => Employee)
export default class EmployeeResolver {
  @Query(() => [Employee], { nullable: 'itemsAndList' })
  async employees(): Promise<Employee[]> {
    return await EmployeeModel.find({}).populate('roles')
  }

  @Query(() => Employee, { nullable: true })
  async employee(@Arg('id') id: string): Promise<Employee | null> {
    return await EmployeeModel.findById(id).populate('roles')
  }

  @Mutation(() => Employee, { nullable: true })
  async createEmployee(
    @Arg('employee') user: UserInput,
    @Ctx() ctx: MyContext,
  ): Promise<Employee | null> {
    try {
      const roleAdmin = await RoleModel.findOne({ name: 'admin' })
      const newModel = await EmployeeModel.create({
        ...user,
        roles: [roleAdmin?.id],
      })

      const newEmployee = await newModel.save()

      return await newEmployee.populate('roles')
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
