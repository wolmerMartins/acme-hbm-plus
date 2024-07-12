import { EventEmitter2 } from '@nestjs/event-emitter'

import { IMeasurementsPublisher } from '../domain/ports/measurements.publisher'
import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { MeasurementWarning } from '../domain/entities/measurement-warning.domain'
import { WarningNotificationVO } from '../domain/entities/warning-notification.vo'

export class MeasurementsEventEmitter implements IMeasurementsPublisher {
  constructor(
    private readonly eventEmitter: EventEmitter2
  ) {}

  public async notifyWarning(profile: Profile, warning: MeasurementWarning): Promise<void> {
    await this.eventEmitter.emitAsync(
      'notify-warning',
      new WarningNotificationVO(
        profile,
        warning
      )
    )
  }
}
