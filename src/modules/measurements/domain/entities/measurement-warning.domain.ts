export class MeasurementWarning {
  constructor(
    private startHeartbeatId: string,
    private startedAt: Date,
    private endHeartbeatId?: string,
    private endedAt?: Date,
    private id?: string
  ) {}

  public getStartHeartbeatId(): string {
    return this.startHeartbeatId
  }

  public getStartedAt(): Date {
    return this.startedAt
  }

  public getEndHeartbeatId(): string {
    return this.endHeartbeatId
  }

  public setEndHeartbeatId(heartbeatId: string): void {
    this.endHeartbeatId = heartbeatId
  }

  public getEndedAt(): Date {
    return this.endedAt
  }

  public setEndedAt(date: Date): void {
    this.endedAt = date
  }

  public getId(): string {
    return this.id
  }
}
