import { Body, Controller, Inject, Post } from '@nestjs/common'

import { MeasurementDTO } from '../dtos/measurement.dto'
import { ICheckCondition } from '../use-cases/check-condition'

@Controller('measurements')
export class MeasurementsController {
  constructor(
    @Inject(ICheckCondition)
    private readonly checkCondition: ICheckCondition
  ) {}

  @Post()
  public register(
    @Body() measurementDto: MeasurementDTO
  ) {
    return this.checkCondition.execute({ measurementDto })
  }
}
