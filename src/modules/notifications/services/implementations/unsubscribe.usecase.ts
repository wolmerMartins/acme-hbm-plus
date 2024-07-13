import { DefaultResponse } from 'src/commons/default-response'
import { INotificationsService } from '../../domain/ports/notifications.service'
import { IUnsubscribe, UnsubscribeArgs } from '../unsubscribe'

export class UnsubscribeUseCase implements IUnsubscribe {
  constructor(
    private readonly service: INotificationsService
  ) {}

  public async execute({ profileName }: UnsubscribeArgs): Promise<DefaultResponse> {
    await this.service.unsubscribe(profileName)

    return new DefaultResponse(true)
  }
}
