import { Heartbeat } from '../entities/heartbeat.domain'

export interface IMeasurementsService {
  checkCondition(heartbeat: Heartbeat): Promise<void>
}
