import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { Notification } from '../entities/notification.domain'
import { Subscription } from '../entities/subscription.vo'
import { INotificationsAdapter } from '../ports/notifications.adapter'
import { INotificationsService } from '../ports/notifications.service'

export class NotificationsService implements INotificationsService {
  constructor(
    private readonly adapter: INotificationsAdapter
  ) {}

  public async subscribe(profileName: string): Promise<Subscription> {
    return new Subscription(profileName)
  }

  public async publish<T extends object>(profile: Profile, data: T): Promise<void> {
    await this.adapter.publish(new Notification(profile.getName(), data))
  }
}
