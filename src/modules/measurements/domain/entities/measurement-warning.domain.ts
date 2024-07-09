export class MeasurementWarning {
  constructor(
    private startHeartbeatId: string,
    private startedAt: Date,
    private endHeartbeatId?: string,
    private endedAt?: Date
  ) {}

  public getStartedAt(): Date {
    return this.startedAt
  }

  public setEndHeartbeatId(heartbeatId: string): void {
    this.endHeartbeatId = heartbeatId
  }

  public setEndedAt(date: Date): void {
    this.endedAt = date
  }
}
