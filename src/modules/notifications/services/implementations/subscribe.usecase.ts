import { Subscription } from '../../domain/entities/subscription.vo'
import { INotificationsService } from '../../domain/ports/notifications.service'
import { ISubscribe, SubscribeArgs } from '../subscribe'

export class SubscribeUseCase implements ISubscribe {
  constructor(
    private readonly service: INotificationsService
  ) {}

  public async execute({ profileName }: SubscribeArgs): Promise<Subscription> {
    const subscription = this.service.subscribe(profileName)

    return subscription
  }
}
