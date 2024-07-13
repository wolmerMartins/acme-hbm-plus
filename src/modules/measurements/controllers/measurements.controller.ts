import { Body, Controller, Inject, Post } from '@nestjs/common'

import { MeasurementDTO } from '../dtos/measurement.dto'
import { ICheckConditionAsync } from '../use-cases/check-condition-async'

@Controller('measurements')
export class MeasurementsController {
  constructor(
    @Inject(ICheckConditionAsync)
    private readonly checkConditionAsync: ICheckConditionAsync
  ) {}

  @Post()
  public register(
    @Body() measurementDto: MeasurementDTO
  ) {
    return this.checkConditionAsync.execute({ measurementDto })
  }
}
