import { DefaultResponse } from 'src/commons/default-response'
import { IUseCase } from 'src/commons/use-case.interface'

export type UnsubscribeArgs = {
  profileName: string
}

export interface IUnsubscribe extends IUseCase<UnsubscribeArgs, DefaultResponse> {}

export const IUnsubscribe = Symbol('IUnsubscribe')
