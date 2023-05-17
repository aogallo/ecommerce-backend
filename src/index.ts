import 'reflect-metadata'
import { startStandaloneServer } from '@apollo/server/standalone'

import dotenv from 'dotenv'
import { createSchema } from './server'
import connectToMongodb from './dataSources/mongo'
import { getUser } from './utils/getUser'

dotenv.config()

async function main(): Promise<void> {
  await connectToMongodb('prod')
  const server = await createSchema()

  await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({
      user: getUser(req),
    }),
  })
}

main()
  .then(() => {
    console.info(`Server listening at: https://localhost:4000 🐳`)
  })
  .catch((error) => {
    console.error('Error to create the server')
    console.error(error)
  })

export default main
