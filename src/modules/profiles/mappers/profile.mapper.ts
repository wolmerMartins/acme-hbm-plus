import { Profile } from '../domain/entities/profile.domain'
import { ProfileSchema } from '../repositories/schemas/profile.schema'

export class ProfileMapper {
  public static entityToDomain(entity: ProfileSchema): Profile {
    return new Profile(
      entity.name,
      entity._id?.toString()
    )
  }
}
