import { IUseCase } from 'src/commons/use-case.interface'
import { MeasurementWarning } from 'src/modules/measurements/domain/entities/measurement-warning.domain'
import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'

export type PublishArgs = {
  profile: Profile
  measurementWarning: MeasurementWarning
}

export interface IPublish extends IUseCase<PublishArgs, void> {}

export const IPublish = Symbol('IPublish')
