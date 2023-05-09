import path from 'path'

import { useContainer, createConnection } from 'typeorm'
import { Container } from 'typeorm-typedi-extensions'

export default async function connectToMongodb(): Promise<void> {
  console.log('process.env.MONGO_URI', process.env.MONGO_URI)
  useContainer(Container)

  await createConnection({
    type: 'mongodb',
    url: process.env.MONGO_URI ?? '',
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, '../entities/**/**.ts')],
  })
  console.log('Connected to mongodb')
}

// const mongoDataSource = new DataSource({
//   type: 'mongodb',
//   url: process.env.MONGO_URI ?? '',
//   synchronize: true,
//   logging: true,
//   entities: [path.join(__dirname, '../entities/**/**.ts')],
// })

// export default mongoDataSource
