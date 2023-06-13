import { getModelForClass, modelOptions, post } from '@typegoose/typegoose'
import { ObjectType } from 'type-graphql'

import { encriptPassword } from '@src/utils/PasswordUtil'
import User from '@src/globalTypes/User'

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
@post<Employee>('save', async function () {
  this.password = await encriptPassword(this.password)
})
@ObjectType()
export class Employee extends User {}

export const EmployeeModel = getModelForClass(Employee)
