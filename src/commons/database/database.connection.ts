import mongoose from 'mongoose'

import { EnvConfig } from '../env.config'
import { CONNECTION_STRING } from '../env.constants'

export class DatabaseConnection {
  constructor(
    private readonly config: EnvConfig
  ) {}

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.config.getValue(CONNECTION_STRING))
    } catch(error) {
      console.error(
        'Something went wrong trying to connect to database',
        error
      )
    }
  }
}
