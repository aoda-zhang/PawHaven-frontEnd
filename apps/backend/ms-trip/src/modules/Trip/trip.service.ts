import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import TripDBCollection from 'src/models/trip.DBcollection'
import { TripHistory } from 'src/models/tripInfo.schema'

@Injectable()
export class TripService {
    constructor(
        @InjectModel(TripDBCollection.HISTORY) private tripHistoryModel: Model<TripHistory>
    ) {}

    async addTrip(payload: Record<string, any>) {
        const tripRecords = await this.tripHistoryModel.estimatedDocumentCount()
        if (tripRecords < 10) {
            await this.tripHistoryModel.create(payload)
            return 'Trip record added successfully'
        }
        throw new Error('Trip record limit reached')
    }
}
