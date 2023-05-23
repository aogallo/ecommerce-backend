import type { HTTPGraphQLHead } from '@apollo/server'
import { type User } from '@entities/User/User'

export interface GraphQLResponseTest {
  http: HTTPGraphQLHead
  body: {
    kind: 'single'
    singleResult: {
      errors?: Record<string, unknown>
      data?:
        | Record<string, unknown>
        | {
            users?: [User]
          }
    }
  }
}
