import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { MeasurementWarning } from '../entities/measurement-warning.domain'

export interface IMeasurementsPublisher {
  notifyWarning(profile: Profile, warning: MeasurementWarning): Promise<void>
}

export const IMeasurementsPublisher = Symbol('IMeasurementsPublisher')
