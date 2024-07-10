import { Notification } from '../entities/notification.domain'

export interface INotificationsAdapter {
  publish<T extends object>(notification: Notification<T>): Promise<void>
}
