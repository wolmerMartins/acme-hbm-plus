import { Module } from '@nestjs/common'

import { IMeasurementsRepository } from './domain/ports/measurements.repository'
import { MeasurementsModel } from './repositories/models/measurements.model'
import { MeasurementWarningsModel } from './repositories/models/measurement-warnings.model'
import { MeasurementsMongoDB } from './repositories/measurements.mongodb'

@Module({
  providers: [
    {
      provide: IMeasurementsRepository,
      useFactory() {
        return new MeasurementsMongoDB(
          new MeasurementsModel(),
          new MeasurementWarningsModel()
        )
      },
    }
  ]
})
export class MeasurementsModule {}
