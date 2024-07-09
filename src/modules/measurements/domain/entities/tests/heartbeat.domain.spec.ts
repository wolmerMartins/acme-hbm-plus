import { Heartbeat } from '../heartbeat.domain'

const BASELINE = 0.18504999999999913

describe('heartbeat.domain', () => {
  it('should receive a heartbeat and sets the is irregular attribute to false when the value is in the baseline', () => {
    const heartbeat = new Heartbeat(BASELINE, 15000, new Date())

    expect(heartbeat).toHaveProperty('isIrregular', false)
  })

  it('should receive a heartbeat and sets the is irregular attribute to true when its rate is at least twety percent under the baseline', () => {
    const TWENTY_PERCENT_UNDER_BASELINE = BASELINE - (BASELINE * 0.2)
    const heartbeat = new Heartbeat(TWENTY_PERCENT_UNDER_BASELINE, 15000, new Date())

    expect(heartbeat).toHaveProperty('isIrregular', true)
  })

  it('should receive a heartbeat and sets the is irregular attribute to true when its rate is at least twenty percent above the baseline', () => {
    const TWENTY_PERCENT_ABOVE_BASELINE = BASELINE + (BASELINE * 0.2)
    const heartbeat = new Heartbeat(TWENTY_PERCENT_ABOVE_BASELINE, 15000, new Date())

    expect(heartbeat).toHaveProperty('isIrregular', true)
  })
})
