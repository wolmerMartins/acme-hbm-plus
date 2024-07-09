const BASELINE_DIFFERENCE_LIMIT = 20

export class Heartbeat {
  private isIrregular: boolean

  constructor(
    private rate: number,
    private period: number,
    private date: Date,
    private id?: string
  ) {
    this.checkIfIsIrregular()
  }

  private resolveSin(): number {
    return 0.01593 * Math.sin(Math.PI * (this.period / 500))
      + 0.03147 * Math.sin(Math.PI * (this.period / 250))
  }

  private resolveCos(): number {
    return 0.12613 * Math.cos(Math.PI * (this.period / 500))
      + 0.12258 * Math.cos(Math.PI * (this.period / 250))
  }

  private calculateBaseline(): number {
    return -0.06366 + this.resolveCos() + this.resolveSin()
  }

  private checkIfIsIrregular(): void {
    const baseline = this.calculateBaseline()

    const difference = this.rate * 100 / baseline

    this.isIrregular = Math.abs(difference - 100) >= BASELINE_DIFFERENCE_LIMIT
  }

  public isRegular(): boolean {
    return !this.isIrregular
  }

  public getDate(): Date {
    return this.date
  }

  public getId(): string {
    return this.id
  }

  public setId(id: string): void {
    this.id = id
  }
}
