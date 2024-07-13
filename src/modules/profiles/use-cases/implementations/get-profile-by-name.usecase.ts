import { Profile } from '../../domain/entities/profile.domain';
import { IProfilesService } from '../../domain/ports/profiles.service';
import { GetProfileByNameArgs, IGetProfileByName } from '../get-profile-by-name'

export class GetProfileByNameUseCase implements IGetProfileByName {
  constructor(
    private readonly service: IProfilesService
  ) {}

  public async execute({ name }: GetProfileByNameArgs): Promise<Profile | undefined> {
    const profile = await this.service.getByName(name)

    return profile
  }
}
