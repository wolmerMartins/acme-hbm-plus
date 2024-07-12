import { FilterQuery, model, Model } from 'mongoose'

import { MeasurementWarningsSchema } from '../schemas/measurement-warnings.schema'

export class MeasurementWarningsModel {
  private readonly collection: Model<MeasurementWarningsSchema>

  constructor() {
    this.collection = model<MeasurementWarningsSchema>('measurementsWarning', MeasurementWarningsSchema)
  }

  public async create(warning: MeasurementWarningsSchema): Promise<void> {
    await this.collection.create(warning)
  }

  public async findOne(
    filter: FilterQuery<MeasurementWarningsSchema>
  ): Promise<MeasurementWarningsSchema | undefined> {
    const document = await this.collection.findOne(filter).lean()

    return document ?? undefined
  }

  public async updateOne(
    filter: FilterQuery<MeasurementWarningsSchema>,
    warning: Partial<MeasurementWarningsSchema>
  ): Promise<void> {
    await this.collection.updateOne(filter, warning)
  }
}
