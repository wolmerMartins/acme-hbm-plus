import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
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

  private async hasEnoughMeasurementsToFinish(profile: Profile, warning: MeasurementWarning): Promise<boolean> {
    const count = await this.repository.countSince(profile, warning.getStartedAt())

    return count >= MEASUREMENTS_COUNT
  }

  private async finishWarning(profile: Profile, heartbeat: Heartbeat, warning?: MeasurementWarning): Promise<void> {
    if (!warning) return

    const hasEnoughMeasurementsToFinish = await this.hasEnoughMeasurementsToFinish(profile, warning)
    if (!hasEnoughMeasurementsToFinish) return

    const irregularMeasurements = await this.repository.findIrregularsSince(profile, warning.getStartedAt())
    if (irregularMeasurements.length) return

    warning.setEndHeartbeatId(heartbeat.getId())
    warning.setEndedAt(heartbeat.getDate())

    await this.repository.finishWarning(profile, warning)

    await this.publisher.notifyWarning(profile, warning)
  }

  private async registerWarning(profile: Profile, heartbeat: Heartbeat, activeWarning?: MeasurementWarning): Promise<void> {
    if (activeWarning) return

    const lastWarning = await this.repository.findLastWarning(profile)

    const irregularMeasurements = await this.repository.findIrregularsInLast(
      profile,
      MEASUREMENTS_COUNT,
      lastWarning?.getEndedAt()
    )
    if (irregularMeasurements.length < MINIMUM_IRREGULARS_TO_WARNING) return

    const warning = new MeasurementWarning(heartbeat.getId(), heartbeat.getDate())

    await this.repository.registerWarning(profile, warning)

    await this.publisher.notifyWarning(profile, warning)
  }

  public async checkCondition(profile: Profile, heartbeat: Heartbeat): Promise<void> {
    const id = await this.repository.register(profile, heartbeat)

    const activeWarning = await this.repository.findActiveWarning(profile)
    if (heartbeat.isRegular() && !activeWarning) return

    heartbeat.setId(id)

    await this.registerWarning(profile, heartbeat, activeWarning)

    await this.finishWarning(profile, heartbeat, activeWarning)
  }
}
