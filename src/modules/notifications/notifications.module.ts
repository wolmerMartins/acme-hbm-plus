import { Module } from '@nestjs/common'

import { EnvConfig } from 'src/commons/env.config'
import { INotificationsAdapter } from './domain/ports/notifications.adapter'
import { NotificationsPushpin } from './adapters/notifications.pushpin'
import { INotificationsService } from './domain/ports/notifications.service'
import { NotificationsService } from './domain/services/notifications'

@Module({
  providers: [
    {
      provide: INotificationsAdapter,
      useFactory() {
        return new NotificationsPushpin(
          new EnvConfig()
        )
      }
    },
    {
      provide: INotificationsService,
      useFactory() {
        return new NotificationsService(...arguments as unknown as [INotificationsAdapter])
      },
      inject: [INotificationsAdapter]
    }
  ]
})
export class NotificationsModule {}
