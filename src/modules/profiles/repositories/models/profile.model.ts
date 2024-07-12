import { FilterQuery, model, Model } from 'mongoose'

import { Profile } from '../../domain/entities/profile.domain'
import { ProfileSchema } from '../schemas/profile.schema'

export class ProfileModel {
  private readonly collection: Model<ProfileSchema>

  constructor() {
    this.collection = model<ProfileSchema>('profiles', ProfileSchema)
  }

  public async create(profile: Profile): Promise<void> {
    await this.collection.create(profile)
  }

  public async findOne(filter: FilterQuery<ProfileSchema>): Promise<ProfileSchema | undefined> {
    const document = await this.collection.findOne(filter)

    return document ?? undefined
  }
}
