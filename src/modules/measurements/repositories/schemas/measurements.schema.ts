import { ObjectId, Schema } from 'mongoose'

export type MeasurementsSchema = {
  profileId: string
  rate: number
  period: number
  date: Date
  isRegular?: boolean
  _id?: ObjectId
}

export const MeasurementsSchema = new Schema<MeasurementsSchema>({
  profileId: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  period: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  isRegular: {
    type: Boolean,
    default: true
  }
})
