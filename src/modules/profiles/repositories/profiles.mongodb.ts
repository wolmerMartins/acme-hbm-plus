import { Profile } from '../domain/entities/profile.domain'
import { IProfilesRepository } from '../domain/ports/profiles.repository'
import { ProfileMapper } from '../mappers/profile.mapper'
import { ProfileModel } from './models/profile.model'

export class ProfilesMongoDB implements IProfilesRepository {
  constructor(
    private readonly model: ProfileModel
  ) {}

  public async getByName(name: string): Promise<Profile | undefined> {
    const document = await this.model.findOne({ name })

    return document
      ? ProfileMapper.entityToDomain(document)
      : undefined
  }

  public async create(profile: Profile): Promise<void> {
    await this.model.create(profile)
  }
}
