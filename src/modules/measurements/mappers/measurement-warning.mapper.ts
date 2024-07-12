import { MeasurementWarning } from '../domain/entities/measurement-warning.domain'
import { MeasurementWarningsSchema } from '../repositories/schemas/measurement-warnings.schema'

export class MeasurementWarningMapper {
  public static entityToDomain(entity: MeasurementWarningsSchema): MeasurementWarning {
    return new MeasurementWarning(
      entity.startHeartbeatId,
      entity.startedAt,
      entity.endHeartbeatId,
      entity.endedAt,
      entity._id?.toString()
    )
  }
}
