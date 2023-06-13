import type { HTTPGraphQLHead } from '@apollo/server'
import { Customer } from '@entities/Customer/Customer'
import { Employee } from '@entities/Employee/Employee'

export interface GraphQLResponseTest {
  http: HTTPGraphQLHead
  body: {
    kind: 'single'
    singleResult: {
      errors?: Record<string, unknown>[]
      data?: Record<string, Record<string, unknown> | Employee[] | Customer[]>
    }
  }
}
