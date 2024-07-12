import { Module } from '@nestjs/common'

import { MeasurementsModule } from './modules/measurements/measurements.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { ProfilesModule } from './modules/profiles/profiles.module'
import { EventEmitterModule } from '@nestjs/event-emitter'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    MeasurementsModule,
    NotificationsModule,
    ProfilesModule
  ]
})
export class AppModule {}
