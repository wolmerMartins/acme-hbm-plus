import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { Heartbeat } from '../entities/heartbeat.domain'

export interface IMeasurementsService {
  checkCondition(profile: Profile, heartbeat: Heartbeat): Promise<void>
}

export const IMeasurementsService = Symbol('IMeasurementsService')
