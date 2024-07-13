import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { Heartbeat } from '../domain/entities/heartbeat.domain'
import { IMeasurementsRepository } from '../domain/ports/measurements.repository'
import { MeasurementWarning } from '../domain/entities/measurement-warning.domain'
import { HeartbeatMapper } from '../mappers/heartbeat.mapper'
import { MeasurementWarningMapper } from '../mappers/measurement-warning.mapper'
import { MeasurementsModel } from './models/measurements.model'
import { MeasurementWarningsModel } from './models/measurement-warnings.model'

export class MeasurementsMongoDB implements IMeasurementsRepository {
  constructor(
    private readonly measurementsModel: MeasurementsModel,
    private readonly measurementWarningsModel: MeasurementWarningsModel
  ) {}

  public async register(profile: Profile, heartbeat: Heartbeat): Promise<string> {
    const id = await this.measurementsModel.create({
      profileId: profile.getId(),
      rate: heartbeat.getRate(),
      period: heartbeat.getPeriod(),
      date: heartbeat.getDate(),
      isRegular: heartbeat.isRegular()
    })

    return id
  }

  public async findIrregularsInLast(profile: Profile, measurementsCount: number, since?: Date): Promise<Heartbeat[]> {
    const filter = {
      profileId: profile.getId(),
      isRegular: false
    }

    if (since) {
      filter['date'] = {
        $gt: since
      }
    }

    const documents = await this.measurementsModel.find(
      filter,
      measurementsCount,
      {
        date: -1
      }
    )

    return documents?.length
      ? documents.map(HeartbeatMapper.entityToDomain)
      : []
  }

  public async findIrregularsSince(profile: Profile, warningStart: Date): Promise<Heartbeat[]> {
    const documents = await this.measurementsModel.find(
      {
        profileId: profile.getId(),
        isRegular: false,
        date: {
          $gt: warningStart
        }
      }
    )

    return documents?.length
      ? documents.map(HeartbeatMapper.entityToDomain)
      : []
  }

  public async registerWarning(profile: Profile, measurementWarning: MeasurementWarning): Promise<void> {
    await this.measurementWarningsModel.create({
      profileId: profile.getId(),
      startHeartbeatId: measurementWarning.getStartHeartbeatId(),
      startedAt: measurementWarning.getStartedAt()
    })
  }

  public async findActiveWarning(profile: Profile): Promise<MeasurementWarning | undefined> {
    const document = await this.measurementWarningsModel.findOne(
      {
        profileId: profile.getId(),
        endedAt: {
          $exists: false
        }
      }
    )

    return document
      ? MeasurementWarningMapper.entityToDomain(document)
      : undefined
  }

  public async finishWarning(profile: Profile, measurementWarning: MeasurementWarning): Promise<void> {
    await this.measurementWarningsModel.updateOne(
      {
        _id: measurementWarning.getId(),
        profileId: profile.getId()
      },
      {
        endHeartbeatId: measurementWarning.getEndHeartbeatId(),
        endedAt: measurementWarning.getEndedAt()
      }
    )
  }

  public async countSince(profile: Profile, warningStart: Date): Promise<number> {
    const count = this.measurementsModel.count(
      {
        profileId: profile.getId(),
        date: {
          $gt: warningStart
        }
      }
    )

    return count
  }

  public async findLastWarning(profile: Profile): Promise<MeasurementWarning | undefined> {
    const document = await this.measurementWarningsModel.findOne(
      {
        profileId: profile.getId()
      }
    )

    return document
      ? MeasurementWarningMapper.entityToDomain(document)
      : undefined
  }
}
