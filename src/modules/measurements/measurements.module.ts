import { Module } from '@nestjs/common'

import { ProfilesModule } from '../profiles/profiles.module'
import { IMeasurementsPublisher } from './domain/ports/measurements.publisher'
import { IMeasurementsRepository } from './domain/ports/measurements.repository'
import { IMeasurementsService } from './domain/ports/measurements.service'
import { MeasurementsService } from './domain/services/measurements'
import { MeasurementsModel } from './repositories/models/measurements.model'
import { MeasurementWarningsModel } from './repositories/models/measurement-warnings.model'
import { MeasurementsMongoDB } from './repositories/measurements.mongodb'
import { MeasurementsEventEmitter } from './publishers/measurements.publisher'
import { MeasurementsController } from './controllers/measurements.controller'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Module({
  imports: [ProfilesModule],
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
      useFactory() {
        return new MeasurementsEventEmitter(...arguments as unknown as [EventEmitter2])
      },
      inject: [EventEmitter2]
    },
    {
      provide: IMeasurementsService,
      useFactory() {
        return new MeasurementsService(...arguments as unknown as [IMeasurementsRepository, IMeasurementsPublisher])
      },
      inject: [IMeasurementsRepository, IMeasurementsPublisher]
    }
  ],
  controllers: [MeasurementsController]
})
export class MeasurementsModule {}
