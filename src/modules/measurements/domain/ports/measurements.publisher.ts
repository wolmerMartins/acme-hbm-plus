import { MeasurementWarning } from '../entities/measurement-warning.domain'

export interface IMeasurementsPublisher {
  notifyWarning(warning: MeasurementWarning): Promise<void>
}
