export class Notification<T extends object> {
  constructor(
    private profile: string,
    private data: T
  ) {}
}
