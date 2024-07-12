import { Profile } from '../domain/entities/profile.domain'
import { ProfileDTO } from '../dtos/profile.dto'
import { ProfileSchema } from '../repositories/schemas/profile.schema'

export class ProfileMapper {
  public static entityToDomain(entity: ProfileSchema): Profile {
    return new Profile(
      entity.name,
      entity._id?.toString()
    )
  }

  public static toDomain(profile: ProfileDTO): Profile {
    return new Profile(profile.name)
  }
}
