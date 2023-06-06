import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import { RoleModel } from '@entities/Roles/Roles'
import { UserInput } from '@resolvers/types/UserTypes'
import CustomError from '@src/utils/CustomError'
import { Employee, EmployeeModel } from '@entities/Employee/Employee'

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
  async createEmployee(@Arg('user') user: UserInput): Promise<Employee | null> {
    try {
      const roleAdmin = await RoleModel.findOne({ name: 'admin' })
      const newModel = await EmployeeModel.create({
        ...user,
        roles: [roleAdmin?.id],
      })
      const newEmployee = await newModel.save()
      return await newEmployee.populate('roles')
    } catch (error) {
      console.log('erro', error)
      CustomError({ code: 'FAILDTODOOPERATION' })
    }
    return null
  }
}
