import { Body, Controller, Inject, Post } from '@nestjs/common'

import { IGetProfileByName } from 'src/modules/profiles/use-cases/get-profile-by-name'
import { IMeasurementsService } from '../domain/ports/measurements.service'
import { MeasurementDTO } from '../dtos/measurement.dto'
import { HeartbeatMapper } from '../mappers/heartbeat.mapper'

@Controller('measurements')
export class MeasurementsController {
  constructor(
    @Inject(IGetProfileByName)
    private readonly getProfileByName: IGetProfileByName,
    @Inject(IMeasurementsService)
    private readonly service: IMeasurementsService
  ) {}

  @Post()
  public async register(
    @Body() measurement: MeasurementDTO
  ) {
    const profile = await this.getProfileByName.execute({ name: measurement.profile })

    await this.service.checkCondition(
      profile,
      HeartbeatMapper.measurementToDomain(measurement)
    )

    return { success: true }
  }
}
