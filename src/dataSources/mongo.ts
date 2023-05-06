import path from 'path'

import { createConnection, useContainer } from 'typeorm'

import { Container } from 'typedi'

export async function connectToMongodb(): Promise<void> {
  await createConnection({
    type: 'mongodb',
    url: process.env.MONGO_URI ?? '',
    synchronize: true,
    logging: true,
    entities: [path.join(__dirname, '../entities/**/**.ts')],
  })
  console.log('Connected to mongodb')
}
