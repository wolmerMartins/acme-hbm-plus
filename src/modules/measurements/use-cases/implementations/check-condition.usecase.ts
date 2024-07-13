import { DefaultResponse } from 'src/commons/default-response'
import { IGetProfileByName } from 'src/modules/profiles/use-cases/get-profile-by-name'
import { IMeasurementsService } from '../../domain/ports/measurements.service'
import { CheckConditionArgs, ICheckCondition } from '../check-condition'
import { HeartbeatMapper } from '../../mappers/heartbeat.mapper'

export class CheckConditionUseCase implements ICheckCondition {
  constructor(
    private readonly getProfileByName: IGetProfileByName,
    private readonly service: IMeasurementsService
  ) {}

  public async execute({ measurementDto }: CheckConditionArgs): Promise<DefaultResponse> {
    const profile = await this.getProfileByName.execute({ name: measurementDto.profile })

    const heartbeat = HeartbeatMapper.measurementToDomain(measurementDto)

    await this.service.checkCondition(profile, heartbeat)

    return new DefaultResponse(true)
  }
}
