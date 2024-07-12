export class Profile {
  constructor(
    private name: string,
    private id?: string
  ) {}

  public getName(): string {
    return this.name
  }

  public getId(): string | undefined {
    return this.id
  }
}
