import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { Subscription } from '../entities/subscription.vo'

export interface INotificationsService {
  subscribe(profileName: string): Subscription
  publish<T extends object>(profile: Profile, data: T): Promise<void>
  unsubscribe(profileName: string): Promise<void>
}

export const INotificationsService = Symbol('INotificationsService')
