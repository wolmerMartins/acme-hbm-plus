import { IUseCase } from "src/commons/use-case.interface"
import { Profile } from "../domain/entities/profile.domain"

export type GetProfileByNameArgs = {
  name: string
}

export interface IGetProfileByName extends IUseCase<GetProfileByNameArgs, Profile | undefined> {}

export const IGetProfileByName = Symbol('IGetProfileByName')
