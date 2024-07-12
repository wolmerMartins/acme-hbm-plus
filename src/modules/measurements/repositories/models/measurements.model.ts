import { FilterQuery, Model, model, QueryOptions } from 'mongoose'

import { MeasurementsSchema } from '../schemas/measurements.schema'

export class MeasurementsModel {
  private readonly collection: Model<MeasurementsSchema>

  constructor() {
    this.collection = model('measurements', MeasurementsSchema)
  }

  public async create(measurement: MeasurementsSchema): Promise<string> {
    const document = new this.collection(measurement)

    await document.save()

    return document._id.toString()
  }

  public async find(
    filter: FilterQuery<MeasurementsSchema>,
    limit?: number,
    sort?: Record<string, number>
  ): Promise<MeasurementsSchema[]> {
    const options: QueryOptions<MeasurementsSchema> = {}

    if (limit) {
      options['limit'] = limit
    }

    if (sort) {
      options['sort'] = sort
    }

    const documents = await this.collection.find(filter, undefined, options)

    return documents
  }
}
