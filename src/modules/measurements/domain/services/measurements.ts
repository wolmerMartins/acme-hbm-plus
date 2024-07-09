import { Heartbeat } from '../entities/heartbeat.domain'
import { MeasurementWarning } from '../entities/measurement-warning.domain'
import { IMeasurementsPublisher } from '../ports/measurements.publisher'
import { IMeasurementsRepository } from '../ports/measurements.repository'
import { IMeasurementsService } from '../ports/measurements.service'

const MEASUREMENTS_COUNT = 60
const MINIMUM_IRREGULARS_TO_WARNING = 5

export class MeasurementsService implements IMeasurementsService {
  constructor(
    private readonly repository: IMeasurementsRepository,
    private readonly publisher: IMeasurementsPublisher
  ) {}

  private async finishWarning(heartbeat: Heartbeat, warning?: MeasurementWarning): Promise<void> {
    if (!warning) return

    const irregularMeasurements = await this.repository.findIrregularsSince(warning.getStartedAt())
    if (irregularMeasurements.length) return

    warning.setEndHeartbeatId(heartbeat.getId())
    warning.setEndedAt(heartbeat.getDate())

    await this.repository.finishWarning(warning)

    await this.publisher.notifyWarning(warning)
  }

  private async registerWarning(heartbeat: Heartbeat, activeWarning?: MeasurementWarning): Promise<void> {
    if (activeWarning) return

    const irregularMeasurements = await this.repository.findIrregularsInLast(MEASUREMENTS_COUNT)
    if (irregularMeasurements.length < MINIMUM_IRREGULARS_TO_WARNING) return

    const warning = new MeasurementWarning(heartbeat.getId(), heartbeat.getDate())

    await this.repository.registerWarning(warning)

    await this.publisher.notifyWarning(warning)
  }

  public async checkCondition(heartbeat: Heartbeat): Promise<void> {
    const id = await this.repository.register(heartbeat)

    const activeWarning = await this.repository.findActiveWarning()
    if (heartbeat.isRegular() && !activeWarning) return

    heartbeat.setId(id)

    await this.registerWarning(heartbeat, activeWarning)

    await this.finishWarning(heartbeat, activeWarning)
  }
}
