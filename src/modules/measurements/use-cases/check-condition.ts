import { IUseCase } from 'src/commons/use-case.interface'
import { DefaultResponse } from 'src/commons/default-response'
import { MeasurementDTO } from '../dtos/measurement.dto'

export type CheckConditionArgs = {
  measurementDto: MeasurementDTO
}

export interface ICheckCondition extends IUseCase<CheckConditionArgs, DefaultResponse> {}

export const ICheckCondition = Symbol('ICheckCondition')
