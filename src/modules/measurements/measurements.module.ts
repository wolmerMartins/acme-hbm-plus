import { Module } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

import { ProfilesModule } from '../profiles/profiles.module'
import { IGetProfileByName } from '../profiles/use-cases/get-profile-by-name'
import { CheckConditionConsumer } from './consumers/check-condition.consumer'
import { MeasurementsController } from './controllers/measurements.controller'
import { IMeasurementsPublisher } from './domain/ports/measurements.publisher'
import { IMeasurementsRepository } from './domain/ports/measurements.repository'
import { IMeasurementsService } from './domain/ports/measurements.service'
import { MeasurementsService } from './domain/services/measurements'
import { MeasurementsModel } from './repositories/models/measurements.model'
import { MeasurementWarningsModel } from './repositories/models/measurement-warnings.model'
import { MeasurementsMongoDB } from './repositories/measurements.mongodb'
import { MeasurementsEventEmitter } from './publishers/measurements.publisher'
import { ICheckCondition } from './use-cases/check-condition'
import { CheckConditionUseCase } from './use-cases/implementations/check-condition.usecase'
import { ICheckConditionAsync } from './use-cases/check-condition-async'
import { CheckConditionAsyncUseCase } from './use-cases/implementations/check-condition-async.usecase'

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
        return new MeasurementsEventEmitter(
          ...arguments as unknown as [EventEmitter2]
        )
      },
      inject: [EventEmitter2]
    },
    {
      provide: IMeasurementsService,
      useFactory() {
        return new MeasurementsService(
          ...arguments as unknown as [IMeasurementsRepository, IMeasurementsPublisher]
        )
      },
      inject: [IMeasurementsRepository, IMeasurementsPublisher]
    },
    {
      provide: ICheckConditionAsync,
      useFactory() {
        return new CheckConditionAsyncUseCase(
          ...arguments as unknown as [EventEmitter2]
        )
      },
      inject: [EventEmitter2]
    },
    {
      provide: ICheckCondition,
      useFactory() {
        return new CheckConditionUseCase(
          ...arguments as unknown as [IGetProfileByName, IMeasurementsService]
        )
      },
      inject: [IGetProfileByName, IMeasurementsService]
    },
    CheckConditionConsumer
  ],
  controllers: [MeasurementsController]
})
export class MeasurementsModule {}
