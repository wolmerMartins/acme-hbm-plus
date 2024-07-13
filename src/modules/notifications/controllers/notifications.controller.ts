import { Controller, Inject, Param, Post, Response } from '@nestjs/common'
import { Response as Res } from 'express'

import { ISubscribe } from '../services/subscribe'
import { IUnsubscribe } from '../services/unsubscribe'

@Controller('notifications/:profileName')
export class NotificationsController {
  constructor(
    @Inject(ISubscribe)
    private readonly subscribe: ISubscribe,
    @Inject(IUnsubscribe)
    private readonly unsubscribe: IUnsubscribe
  ) {}

  @Post('subscribe')
  public async subscribeToChannel(
    @Param('profileName') profileName: string,
    @Response() response: Res
  ) {
    const subscription = await this.subscribe.execute({ profileName })

    response
      .writeHead(202, subscription.getHeaders())
      .end()
  }

  @Post('unsubscribe')
  public async unsubscribeToChannel(
    @Param('profileName') profileName: string
  ) {
    await this.unsubscribe.execute({ profileName })
  }
}
