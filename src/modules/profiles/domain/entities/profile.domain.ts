export class Profile {
  constructor(
    private name: string,
    private id?: string
  ) {}

  public getName(): string {
    return this.name
  }
}
