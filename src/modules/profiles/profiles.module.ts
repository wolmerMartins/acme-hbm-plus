import { Module } from '@nestjs/common'

import { IProfilesRepository } from './domain/ports/profiles.repository'
import { ProfilesMongoDB } from './repositories/profiles.mongodb'
import { ProfileModel } from './repositories/models/profile.model'

@Module({
  providers: [
    {
      provide: IProfilesRepository,
      useFactory() {
        return new ProfilesMongoDB(
          new ProfileModel()
        )
      }
    }
  ]
})
export class ProfilesModule {}
