import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'

export interface INotificationsService {
  publish<T extends object>(profile: Profile, data: T): Promise<void>
}
