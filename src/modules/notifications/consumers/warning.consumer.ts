import { Inject, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import { WarningNotificationVO } from 'src/modules/measurements/domain/entities/warning-notification.vo'
import { IPublish } from '../services/publish'

@Injectable()
export class WarningConsumer {
  constructor(
    @Inject(IPublish)
    private readonly publish: IPublish
  ) {}

  @OnEvent('notify-warning')
  public async handleWarningNotification(event: WarningNotificationVO): Promise<void> {
    await this.publish.execute({
      profile: event.profile,
      measurementWarning: event.warning
    })
  }
}
