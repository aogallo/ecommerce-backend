import 'reflect-metadata'
import { startStandaloneServer } from '@apollo/server/standalone'

import { connect, Types } from 'mongoose'
import dotenv from 'dotenv'
import { createSchema } from './server'
import { getUser } from './utils/getUser'

dotenv.config()

async function main(): Promise<void> {
  // await connectToMongodb('prod')
  const mongoose = await connect(process.env.MONGO_URI!)

  // clean and seed database with some data
  // await mongoose.connection.db.dropDatabase()
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
