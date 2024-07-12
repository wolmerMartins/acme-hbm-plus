import { ObjectId, Schema } from 'mongoose'

export type MeasurementWarningsSchema = {
  profileId: string
  startHeartbeatId: string
  startedAt: Date
  endHeartbeatId?: string
  endedAt?: Date
  _id?: ObjectId
}

export const MeasurementWarningsSchema = new Schema<MeasurementWarningsSchema>({
  profileId: {
    type: String,
    required: true
  },
  startHeartbeatId: {
    type: String,
    required: true
  },
  startedAt: {
    type: Date,
    required: true
  },
  endHeartbeatId: {
    type: String
  },
  endedAt: {
    type: Date
  }
})
