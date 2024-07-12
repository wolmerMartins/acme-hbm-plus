import { Inject, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import { INotificationsService } from '../domain/ports/notifications.service'
import { WarningNotificationVO } from 'src/modules/measurements/domain/entities/warning-notification.vo'

@Injectable()
export class WarningConsumer {
  constructor(
    @Inject(INotificationsService)
    private readonly service: INotificationsService
  ) {}

  @OnEvent('notify-warning')
  public async handleWarningNotification(event: WarningNotificationVO): Promise<void> {
    await this.service.publish(event.profile, event.warning)
  }
}
