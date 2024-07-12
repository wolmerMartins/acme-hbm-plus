import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { MeasurementWarning } from './measurement-warning.domain'

export class WarningNotificationVO {
  constructor(
    public profile: Profile,
    public warning: MeasurementWarning
  ) {}
}
