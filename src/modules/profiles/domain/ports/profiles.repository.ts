import { Profile } from '../entities/profile.domain'

export interface IProfilesRepository {
  getByName(name: string): Promise<Profile | undefined>
  create(profile: Profile): Promise<void>
}
