import { IUseCase } from 'src/commons/use-case.interface'
import { Subscription } from '../domain/entities/subscription.vo'

export type SubscribeArgs = {
  profileName: string
}

export interface ISubscribe extends IUseCase<SubscribeArgs, Subscription> {}

export const ISubscribe = Symbol('ISubscribe')
