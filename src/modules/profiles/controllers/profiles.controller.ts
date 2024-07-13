import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common'

import { DefaultResponse } from 'src/commons/default-response'
import { ProfileDTO } from '../dtos/profile.dto'
import { ICreateProfile } from '../use-cases/create-profile'

@Controller('profiles')
export class ProfilesController {
  constructor(
    @Inject(ICreateProfile)
    private readonly createProfile: ICreateProfile
  ) {}

  @Post()
  @HttpCode(201)
  public create(
    @Body() profileDto: ProfileDTO
  ): Promise<DefaultResponse> {
    return this.createProfile.execute({ profileDto })
  }
}
