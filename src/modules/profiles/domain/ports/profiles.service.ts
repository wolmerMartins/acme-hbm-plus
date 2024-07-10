import { Profile } from '../entities/profile.domain'

export interface IProfilesService {
  getByName(name: string): Promise<Profile | undefined>
  create(profile: Profile): Promise<void>
}
