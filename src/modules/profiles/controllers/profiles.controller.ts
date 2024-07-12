import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common'

import { IProfilesService } from '../domain/ports/profiles.service'
import { ProfileDTO } from '../dtos/profile.dto'
import { ProfileMapper } from '../mappers/profile.mapper'

@Controller('profiles')
export class ProfilesController {
  constructor(
    @Inject(IProfilesService)
    private readonly service: IProfilesService
  ) {}

  @Post()
  @HttpCode(201)
  public async create(
    @Body() profile: ProfileDTO
  ) {
    await this.service.create(ProfileMapper.toDomain(profile))

    return { success: true }
  }
}
