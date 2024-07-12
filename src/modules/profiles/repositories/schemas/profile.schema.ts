import { ObjectId, Schema } from 'mongoose'

export type ProfileSchema = {
  name: string
  _id?: ObjectId
}

export const ProfileSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})
