import { Heartbeat } from '../entities/heartbeat.domain'
import { MeasurementWarning } from '../entities/measurement-warning.domain'

export interface IMeasurementsRepository {
  register(heartbeat: Heartbeat): Promise<string>
  findIrregularsInLast(measurementsCount: number): Promise<Heartbeat[]>
  findIrregularsSince(warningStart: Date): Promise<Heartbeat[]>
  registerWarning(measurementWarning: MeasurementWarning): Promise<void>
  findActiveWarning(): Promise<MeasurementWarning | undefined>
  finishWarning(measurementWarning: MeasurementWarning): Promise<void>
}
