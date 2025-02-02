export class Notification<T extends object> {
  constructor(
    private profile: string,
    private data: T
  ) {}

  public getProfile(): string {
    return this.profile
  }
}
