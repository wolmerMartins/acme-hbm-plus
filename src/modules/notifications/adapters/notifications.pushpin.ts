import { EnvConfig } from 'src/commons/env.config'
import { NOTIFICATION_URL } from 'src/commons/env.constants'
import { INotificationsAdapter } from '../domain/ports/notifications.adapter'
import { Notification } from '../domain/entities/notification.domain'

type StreamData = {
  action?: string
  content?: string
}

export class NotificationsPushpin implements INotificationsAdapter {
  constructor(
    private readonly config: EnvConfig
  ) {}

  private sendEvent(channel: string, streamData: StreamData): Promise<Response> {
    return fetch(
      `${this.config.getValue(NOTIFICATION_URL)}/publish`,
      {
        method: 'POST',
        body: JSON.stringify(
          {
            items: [
              {
                channel,
                id: `${Date.now()}`,
                formats: {
                  'http-stream': streamData
                }
              }
            ]
          }
        )
      }
    )
  }

  public async publish<T extends object>(notification: Notification<T>): Promise<void> {
    await this.sendEvent(
      notification.getProfile(),
      {
        content: `${JSON.stringify(notification)}\n`
      }
    )
  }

  public async close(channel: string): Promise<void> {
    await this.sendEvent(
      channel,
      {
        action: 'close'
      }
    )
  }
}
