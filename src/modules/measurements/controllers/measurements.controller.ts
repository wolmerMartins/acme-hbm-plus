import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IProfilesService } from 'src/modules/profiles/domain/ports/profiles.service';
import { IMeasurementsService } from '../domain/ports/measurements.service';
import { MeasurementDTO } from '../dtos/measurement.dto';
import { HeartbeatMapper } from '../mappers/heartbeat.mapper';

@Controller('measurements')
export class MeasurementsController {
  constructor(
    @Inject(IProfilesService)
    private readonly profilesService: IProfilesService,
    @Inject(IMeasurementsService)
    private readonly service: IMeasurementsService
  ) {}

  @Post()
  public async register(
    @Body() measurement: MeasurementDTO
  ) {
    const profile = await this.profilesService.getByName(measurement.profile)

    await this.service.checkCondition(
      profile,
      HeartbeatMapper.measurementToDomain(measurement)
    )

    return { success: true }
  }
}
