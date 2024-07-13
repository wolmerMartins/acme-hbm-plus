import { DefaultResponse } from 'src/commons/default-response'
import { IProfilesService } from '../../domain/ports/profiles.service'
import { ProfileMapper } from '../../mappers/profile.mapper'
import { CreateProfileArgs, ICreateProfile } from '../create-profile'

export class CreateProfileUseCase implements ICreateProfile {
  constructor(
    private readonly service: IProfilesService
  ) {}

  public async execute({ profileDto }: CreateProfileArgs): Promise<DefaultResponse> {
    const profile = ProfileMapper.toDomain(profileDto)

    await this.service.create(profile)

    return new DefaultResponse(true)
  }
}
