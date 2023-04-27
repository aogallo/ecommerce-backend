import { join } from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import { type Resolvers } from 'src/generated/graphql'

const resolversArray = loadFilesSync(join(__dirname, './**/*Resolvers.ts'), {
  ignoreIndex: true,
  extensions: ['ts'],
})

const resolvers: Resolvers = mergeResolvers(resolversArray)

export default resolvers
