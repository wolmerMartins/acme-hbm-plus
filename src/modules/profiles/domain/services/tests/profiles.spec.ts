import { randomUUID } from "crypto"
import { Profile } from "../../entities/profile.domain"
import { IProfilesRepository } from "../../ports/profiles.repository"
import { ProfilesService } from "../profiles"

describe('profiles', () => {
  class RepositoryMock implements IProfilesRepository {
    getByName = jest.fn<Promise<Profile | undefined>, [name: string]>()
    create = jest.fn<Promise<void>, [profile: Profile]>()
  }

  const repositoryMock = new RepositoryMock()
  const service = new ProfilesService(repositoryMock)

  afterEach(jest.clearAllMocks)

  describe('create()', () => {
    it('should not create a new profile if it already exists for the given name', async () => {
      repositoryMock.getByName.mockResolvedValueOnce(new Profile('testing', randomUUID()))

      await service.create(new Profile('testing'))

      expect(repositoryMock.getByName).toHaveBeenCalledTimes(1)
      expect(repositoryMock.create).not.toHaveBeenCalled()
    })

    it('should create a new profile if it does not for the given name yet', async () => {
      repositoryMock.getByName.mockResolvedValueOnce(undefined)

      await service.create(new Profile('testing'))

      expect(repositoryMock.getByName).toHaveBeenCalledTimes(1)
      expect(repositoryMock.create).toHaveBeenCalledTimes(1)
    })
  })
})
