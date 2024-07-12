type SubscriptionHeaders = {
  'Grip-Channel': string
  'Grip-Hold': string
  'Content-Type': string
}

export class Subscription {
  constructor(
    private channel: string
  ) {}

  public getHeaders(): SubscriptionHeaders {
    return {
      'Grip-Channel': this.channel,
      'Grip-Hold': 'stream',
      'Content-Type': 'text/plain'
    }
  }
}
