import { INotificationsService } from '../../domain/ports/notifications.service'
import { IPublish, PublishArgs } from '../publish'

export class PublishUseCase implements IPublish {
  constructor(
    private readonly service: INotificationsService
  ) {}

  public async execute({ profile, measurementWarning }: PublishArgs): Promise<void> {
    await this.service.publish(profile, measurementWarning)
  }
}
