import { join } from 'path'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'

const resolversArray = loadFilesSync(join(__dirname, './**/*Resolvers.ts'), {
  ignoreIndex: true,
  extensions: ['ts'],
})

const resolvers = mergeResolvers(resolversArray)

export default resolvers
