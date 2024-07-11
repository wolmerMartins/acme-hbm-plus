import 'dotenv/config'

export class EnvConfig {
  public getValue(key: string): string {
    return process.env[key]
  }

  public getValueAsNumber(key: string): number {
    return Number(this.getValue(key))
  }
}
