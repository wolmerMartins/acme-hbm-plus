import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { Heartbeat } from '../entities/heartbeat.domain'
import { MeasurementWarning } from '../entities/measurement-warning.domain'

export interface IMeasurementsRepository {
  register(profile: Profile, heartbeat: Heartbeat): Promise<string>
  findIrregularsInLast(profile: Profile, measurementsCount: number, since?: Date): Promise<Heartbeat[]>
  findIrregularsSince(profile: Profile, warningStart: Date): Promise<Heartbeat[]>
  registerWarning(profile: Profile, measurementWarning: MeasurementWarning): Promise<void>
  findActiveWarning(profile: Profile): Promise<MeasurementWarning | undefined>
  finishWarning(profile: Profile, measurementWarning: MeasurementWarning): Promise<void>
  countSince(profile: Profile, warningStart: Date): Promise<number>
  findLastWarning(profile: Profile): Promise<MeasurementWarning | undefined>
}

export const IMeasurementsRepository = Symbol('IMeasurementsRepository')
