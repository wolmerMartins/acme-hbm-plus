import { Inject, Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

import { MeasurementDTO } from '../dtos/measurement.dto'
import { ICheckCondition } from '../use-cases/check-condition'

@Injectable()
export class CheckConditionConsumer {
  constructor(
    @Inject(ICheckCondition)
    private readonly checkCondition: ICheckCondition
  ) {}

  @OnEvent('check-condition')
  public async checkConditionAsync(measurementDto: MeasurementDTO): Promise<void> {
    await this.checkCondition.execute({ measurementDto })
  }
}
