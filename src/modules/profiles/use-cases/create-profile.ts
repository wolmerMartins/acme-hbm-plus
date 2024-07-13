import { IUseCase } from 'src/commons/use-case.interface'
import { DefaultResponse } from 'src/commons/default-response'
import { ProfileDTO } from '../dtos/profile.dto'

export type CreateProfileArgs = {
  profileDto: ProfileDTO
}

export interface ICreateProfile extends IUseCase<CreateProfileArgs, DefaultResponse> {}

export const ICreateProfile = Symbol('ICreateProfile')
