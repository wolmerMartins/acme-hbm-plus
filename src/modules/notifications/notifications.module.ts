import { Module } from '@nestjs/common'

import { EnvConfig } from 'src/commons/env.config'
import { INotificationsAdapter } from './domain/ports/notifications.adapter'
import { NotificationsPushpin } from './adapters/notifications.pushpin'

@Module({
  providers: [
    {
      provide: INotificationsAdapter,
      useFactory() {
        return new NotificationsPushpin(
          new EnvConfig()
        )
      }
    }
  ]
})
export class NotificationsModule {}
