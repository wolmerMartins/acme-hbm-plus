import { Module } from '@nestjs/common'

import { EnvConfig } from 'src/commons/env.config'
import { INotificationsAdapter } from './domain/ports/notifications.adapter'
import { NotificationsPushpin } from './adapters/notifications.pushpin'
import { INotificationsService } from './domain/ports/notifications.service'
import { NotificationsService } from './domain/services/notifications'
import { NotificationsController } from './controllers/notifications.controller'
import { WarningConsumer } from './consumers/warning.consumer'
import { ISubscribe } from './services/subscribe'
import { SubscribeUseCase } from './services/implementations/subscribe.usecase'
import { IUnsubscribe } from './services/unsubscribe'
import { UnsubscribeUseCase } from './services/implementations/unsubscribe.usecase'
import { IPublish } from './services/publish'
import { PublishUseCase } from './services/implementations/publish.usecase'

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
        return new NotificationsService(
          ...arguments as unknown as [INotificationsAdapter]
        )
      },
      inject: [INotificationsAdapter]
    },
    {
      provide: ISubscribe,
      useFactory() {
        return new SubscribeUseCase(
          ...arguments as unknown as [INotificationsService]
        )
      },
      inject: [INotificationsService]
    },
    {
      provide: IUnsubscribe,
      useFactory() {
        return new UnsubscribeUseCase(
          ...arguments as unknown as [INotificationsService]
        )
      },
      inject: [INotificationsService]
    },
    {
      provide: IPublish,
      useFactory() {
        return new PublishUseCase(
          ...arguments as unknown as [INotificationsService]
        )
      },
      inject: [INotificationsService]
    },
    WarningConsumer
  ],
  controllers: [NotificationsController]
})
export class NotificationsModule {}
