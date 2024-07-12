import { post } from 'superagent'

import { EnvConfig } from 'src/commons/env.config'
import { NOTIFICATION_URL } from 'src/commons/env.constants'
import { INotificationsAdapter } from '../domain/ports/notifications.adapter'
import { Notification } from '../domain/entities/notification.domain'

export class NotificationsPushpin implements INotificationsAdapter {
  constructor(
    private readonly config: EnvConfig
  ) {}

  public async publish<T extends object>(notification: Notification<T>): Promise<void> {
    await post(this.config.getValue(NOTIFICATION_URL))
      .send({
        items: [
          {
            channel: notification.getProfile(),
            id: Date.now(),
            formats: {
              'http-stream': {
                content: JSON.stringify(notification)
              }
            },
          }
        ]
      })
      .set('Content-Type', 'application/json')
      .then()
  }
}
