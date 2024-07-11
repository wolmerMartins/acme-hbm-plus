import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { EnvConfig } from './commons/env.config'
import { PORT } from './commons/env.constants'
import { DatabaseConnection } from './commons/database/database.connection'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new EnvConfig()
  const databaseConnection = new DatabaseConnection(config)

  await databaseConnection.connect()

  await app.listen(config.getValueAsNumber(PORT))
}
bootstrap()
