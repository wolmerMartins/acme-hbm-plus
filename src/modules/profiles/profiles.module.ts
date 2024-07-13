import { Module } from '@nestjs/common'

import { IProfilesRepository } from './domain/ports/profiles.repository'
import { ProfilesMongoDB } from './repositories/profiles.mongodb'
import { ProfileModel } from './repositories/models/profile.model'
import { ProfilesController } from './controllers/profiles.controller'
import { IProfilesService } from './domain/ports/profiles.service'
import { ProfilesService } from './domain/services/profiles'
import { ICreateProfile } from './use-cases/create-profile'
import { CreateProfileUseCase } from './use-cases/implementations/create-profile.usecase'
import { IGetProfileByName } from './use-cases/get-profile-by-name'
import { GetProfileByNameUseCase } from './use-cases/implementations/get-profile-by-name.usecase'

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
        return new ProfilesService(
          ...arguments as unknown as [IProfilesRepository]
        )
      },
      inject: [IProfilesRepository]
    },
    {
      provide: ICreateProfile,
      useFactory() {
        return new CreateProfileUseCase(
          ...arguments as unknown as [IProfilesService]
        )
      },
      inject: [IProfilesService]
    },
    {
      provide: IGetProfileByName,
      useFactory() {
        return new GetProfileByNameUseCase(
          ...arguments as unknown as [IProfilesService]
        )
      },
      inject: [IProfilesService]
    }
  ],
  controllers: [ProfilesController],
  exports: [IGetProfileByName]
})
export class ProfilesModule {}
