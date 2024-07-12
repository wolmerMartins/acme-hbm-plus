import { Controller, Inject, Param, Post, Response } from '@nestjs/common'

import { INotificationsService } from '../domain/ports/notifications.service'
import { Response as Res } from 'express'

@Controller('notifications')
export class NotificationsController {
  constructor(
    @Inject(INotificationsService)
    private readonly service: INotificationsService
  ) {}

  @Post(':profileName/subscribe')
  public async subscribe(
    @Param('profileName') profileName: string,
    @Response() response: Res
  ) {
    const subscription = await this.service.subscribe(profileName)

    response
      .writeHead(202, subscription.getHeaders())
      .end()
  }
}
