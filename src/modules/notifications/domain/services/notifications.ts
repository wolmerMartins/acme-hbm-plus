import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'
import { INotificationsAdapter } from '../ports/notifications.adapter'
import { INotificationsService } from '../ports/notifications.service'
import { Notification } from '../entities/notification.domain'

export class NotificationsService implements INotificationsService {
  constructor(
    private readonly adapter: INotificationsAdapter
  ) {}

  public async publish<T extends object>(profile: Profile, data: T): Promise<void> {
    await this.adapter.publish(new Notification(profile.getName(), data))
  }
}
