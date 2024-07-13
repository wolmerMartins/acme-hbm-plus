import { IUseCase } from 'src/commons/use-case.interface'
import { MeasurementDTO } from '../dtos/measurement.dto'
import { DefaultResponse } from 'src/commons/default-response'

export type CheckConditionAsyncArgs = {
  measurementDto: MeasurementDTO
}

export interface ICheckConditionAsync extends IUseCase<CheckConditionAsyncArgs, DefaultResponse> {}

export const ICheckConditionAsync = Symbol('ICheckConditionAsync')
