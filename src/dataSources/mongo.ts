import path from 'path'

import { useContainer, createConnection } from 'typeorm'
import { Container } from 'typeorm-typedi-extensions'

export default async function connectToMongodb(
  database = 'test',
): Promise<void> {
  useContainer(Container)

  await createConnection({
    type: 'mongodb',
    url: process.env.MONGO_URI ?? '',
    synchronize: true,
    logging: true,
    database,
    entities: [path.join(__dirname, '../entities/**/**.ts')],
  })
  console.log('Connected to mongodb')
}
