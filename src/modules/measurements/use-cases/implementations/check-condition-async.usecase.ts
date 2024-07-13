import { EventEmitter2 } from '@nestjs/event-emitter'

import { DefaultResponse } from 'src/commons/default-response'
import { CheckConditionAsyncArgs, ICheckConditionAsync } from '../check-condition-async'

export class CheckConditionAsyncUseCase implements ICheckConditionAsync {
  constructor(
    private readonly eventEmitter: EventEmitter2
  ) {}

  public async execute({ measurementDto }: CheckConditionAsyncArgs): Promise<DefaultResponse> {
    await this.eventEmitter.emitAsync(
      'check-condition',
      measurementDto
    )

    return new DefaultResponse(true)
  }
}
