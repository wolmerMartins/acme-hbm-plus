import { randomUUID } from 'crypto'
import { Heartbeat } from '../../entities/heartbeat.domain'
import { MeasurementWarning } from '../../entities/measurement-warning.domain'
import { IMeasurementsRepository } from '../../ports/measurements.repository'
import { MeasurementsService } from '../measurements'
import { IMeasurementsPublisher } from '../../ports/measurements.publisher'
import { Profile } from 'src/modules/profiles/domain/entities/profile.domain'

describe('measurements', () => {
  const BASELINE_RATE = 0.18504999999999913

  class RepositoryMock implements IMeasurementsRepository {
    register = jest.fn<Promise<string>, [profile: Profile, heartbeat: Heartbeat]>()
    findIrregularsInLast = jest.fn<Promise<Heartbeat[]>, [profile: Profile, measurementsCount: number]>(
      () => Promise.resolve([])
    )
    findIrregularsSince = jest.fn<Promise<Heartbeat[]>, [profile: Profile, warningStart: Date]>(
      () => Promise.resolve([])
    )
    registerWarning = jest.fn<Promise<void>, [profile: Profile, measurementWarning: MeasurementWarning]>()
    findActiveWarning = jest.fn<Promise<MeasurementWarning | undefined>, [profile: Profile]>()
    finishWarning = jest.fn<Promise<void>, [profile: Profile, measurementWarning: MeasurementWarning]>()
  }

  class PublisherMock implements IMeasurementsPublisher {
    notifyWarning = jest.fn<Promise<void>, [profile: Profile, warning: MeasurementWarning]>()
  }

  const repositoryMock = new RepositoryMock()
  const publisherMock = new PublisherMock()
  const service = new MeasurementsService(repositoryMock, publisherMock)

  const profile = new Profile('testing', randomUUID())
  const regularHeartbeat = new Heartbeat(BASELINE_RATE, 15000, new Date())
  const irregularHeartbeat = new Heartbeat(BASELINE_RATE - (BASELINE_RATE * 0.2), 15000, new Date())

  afterEach(jest.clearAllMocks)

  describe('checkCondition()', () => {
    it('should register a new heartbeat measurement', async () => {
      await service.checkCondition(profile, regularHeartbeat)

      expect(repositoryMock.register).toHaveBeenCalledTimes(1)
    })

    it('should not retrieve the last measurements if the current measurement is regular and does not have an active warning', async () => {
      await service.checkCondition(profile, regularHeartbeat)

      expect(repositoryMock.findActiveWarning).toHaveBeenCalledTimes(1)
      expect(repositoryMock.findIrregularsInLast).not.toHaveBeenCalled()
    })

    it('should retrieve the last measurements if the current measurement is irregular', async () => {
      await service.checkCondition(profile, irregularHeartbeat)

      expect(repositoryMock.findIrregularsInLast).toHaveBeenCalledTimes(1)
    })

    it('should not register a warning if it has less than five irregulars measurements in the last sixty', async () => {
      repositoryMock.findIrregularsInLast.mockResolvedValueOnce(
        [
          irregularHeartbeat,
          irregularHeartbeat,
          irregularHeartbeat
        ]
      )

      await service.checkCondition(profile, irregularHeartbeat)

      expect(repositoryMock.findIrregularsInLast).toHaveBeenCalledTimes(1)
      expect(repositoryMock.registerWarning).not.toHaveBeenCalled()
    })

    it('should register a warning if it has at least five irregulars measurements in the last sixty', async () => {
      repositoryMock.findIrregularsInLast.mockResolvedValueOnce(
        [
          irregularHeartbeat,
          irregularHeartbeat,
          irregularHeartbeat,
          irregularHeartbeat,
          irregularHeartbeat
        ]
      )

      await service.checkCondition(profile, irregularHeartbeat)

      expect(repositoryMock.findIrregularsInLast).toHaveBeenCalledTimes(1)
      expect(repositoryMock.registerWarning).toHaveBeenCalledTimes(1)
    })

    it('should publish a notification when register a warning', async () => {
      repositoryMock.findIrregularsInLast.mockResolvedValueOnce(
        [
          irregularHeartbeat,
          irregularHeartbeat,
          irregularHeartbeat,
          irregularHeartbeat,
          irregularHeartbeat
        ]
      )

      await service.checkCondition(profile, irregularHeartbeat)

      expect(repositoryMock.findIrregularsInLast).toHaveBeenCalledTimes(1)
      expect(repositoryMock.registerWarning).toHaveBeenCalledTimes(1)
      expect(publisherMock.notifyWarning).toHaveBeenCalledTimes(1)
    })

    it('should check if has any irregulars since the start of the warning', async () => {
      const activeWarning = new MeasurementWarning(randomUUID(), new Date())
      repositoryMock.findActiveWarning.mockResolvedValueOnce(activeWarning)

      await service.checkCondition(profile, regularHeartbeat)

      expect(repositoryMock.findActiveWarning).toHaveBeenCalledTimes(1)
      expect(repositoryMock.registerWarning).not.toHaveBeenCalled()
      expect(repositoryMock.findIrregularsSince).toHaveBeenCalledWith(profile, activeWarning.getStartedAt())
    })

    it('should not finish the warning if there is any irregular behaviour in the sixty measurements since the warning start', async () => {
      repositoryMock.findActiveWarning.mockResolvedValueOnce(new MeasurementWarning(randomUUID(), new Date()))
      repositoryMock.findIrregularsSince.mockResolvedValueOnce([irregularHeartbeat])

      await service.checkCondition(profile, regularHeartbeat)

      expect(repositoryMock.findActiveWarning).toHaveBeenCalledTimes(1)
      expect(repositoryMock.findIrregularsSince).toHaveBeenCalledTimes(1)
      expect(repositoryMock.finishWarning).not.toHaveBeenCalled()
    })

    it('should finish the warning if no irregular measurement is registered in the last sixty since the warning start', async () => {
      const heartbeatStartId = randomUUID()
      const heartbeatEndId = randomUUID()
      const warningStartedAt = new Date()

      repositoryMock.register.mockResolvedValueOnce(heartbeatEndId)
      repositoryMock.findActiveWarning.mockResolvedValueOnce(new MeasurementWarning(heartbeatStartId, warningStartedAt))

      await service.checkCondition(profile, regularHeartbeat)

      expect(repositoryMock.findActiveWarning).toHaveBeenCalledTimes(1)
      expect(repositoryMock.findIrregularsSince).toHaveBeenCalledTimes(1)
      expect(repositoryMock.finishWarning).toHaveBeenCalledWith(
        profile,
        new MeasurementWarning(
          heartbeatStartId,
          warningStartedAt,
          heartbeatEndId,
          regularHeartbeat.getDate()
        )
      )
    })

    it('should publish a notification when finishing the warning', async () => {
      repositoryMock.findActiveWarning.mockResolvedValueOnce(new MeasurementWarning(randomUUID(), new Date()))

      await service.checkCondition(profile, regularHeartbeat)

      expect(repositoryMock.findActiveWarning).toHaveBeenCalledTimes(1)
      expect(repositoryMock.finishWarning).toHaveBeenCalledTimes(1)
      expect(publisherMock.notifyWarning).toHaveBeenCalledTimes(1)
    })
  })
})
