import { Module } from '@nestjs/common'

import { IProfilesRepository } from './domain/ports/profiles.repository'
import { ProfilesMongoDB } from './repositories/profiles.mongodb'
import { ProfileModel } from './repositories/models/profile.model'
import { ProfilesController } from './controllers/profiles.controller'
import { IProfilesService } from './domain/ports/profiles.service'
import { ProfilesService } from './domain/services/profiles'

@Module({
  providers: [
    {
      provide: IProfilesRepository,
      useFactory() {
        return new ProfilesMongoDB(
          new ProfileModel()
        )
      }
    },
    {
      provide: IProfilesService,
      useFactory() {
        return new ProfilesService(...arguments as unknown as [IProfilesRepository])
      },
      inject: [IProfilesRepository]
    }
  ],
  controllers: [ProfilesController],
  exports: [IProfilesService]
})
export class ProfilesModule {}
