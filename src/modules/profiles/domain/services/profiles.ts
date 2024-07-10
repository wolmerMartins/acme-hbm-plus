import { Profile } from '../entities/profile.domain'
import { IProfilesRepository } from '../ports/profiles.repository'
import { IProfilesService } from '../ports/profiles.service'

export class ProfilesService implements IProfilesService {
  constructor(
    private readonly repository: IProfilesRepository
  ) {}

  public getByName(name: string): Promise<Profile | undefined> {
    return this.repository.getByName(name)
  }

  public async create(profile: Profile): Promise<void> {
    const currentProfile = await this.getByName(profile.getName())
    if (currentProfile) return

    await this.repository.create(profile)
  }
}
