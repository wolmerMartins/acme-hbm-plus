import { Heartbeat } from '../domain/entities/heartbeat.domain'
import { MeasurementDTO } from '../dtos/measurement.dto'
import { MeasurementsSchema } from '../repositories/schemas/measurements.schema'

export class HeartbeatMapper {
  public static entityToDomain(entity: MeasurementsSchema): Heartbeat {
    return new Heartbeat(
      entity.rate,
      entity.period,
      entity.date,
      entity._id.toString()
    )
  }

  public static measurementToDomain(measurement: MeasurementDTO): Heartbeat {
    return new Heartbeat(
      measurement.rate,
      measurement.period,
      new Date()
    )
  }
}
