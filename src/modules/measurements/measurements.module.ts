import { Module } from '@nestjs/common'

import { IMeasurementsPublisher } from './domain/ports/measurements.publisher'
import { IMeasurementsRepository } from './domain/ports/measurements.repository'
import { MeasurementsModel } from './repositories/models/measurements.model'
import { MeasurementWarningsModel } from './repositories/models/measurement-warnings.model'
import { MeasurementsMongoDB } from './repositories/measurements.mongodb'
import { MeasurementsEventEmitter } from './publishers/measurements.publisher'

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
    },
    {
      provide: IMeasurementsPublisher,
      useClass: MeasurementsEventEmitter
    }
  ]
})
export class MeasurementsModule {}
