import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import TripDBCollection from './trip.DBcollection'
import CommonSchema from './common.schema'

@Schema({ collection: TripDBCollection.HISTORY, timestamps: true })
export class TripHistory extends CommonSchema {
    @Prop({
        required: true,
        type: String
    })
    destination: string

    @Prop({
        required: true,
        type: String
    })
    date: string

    @Prop({
        required: true,
        type: String
    })
    note: string
}
export const TripHistorySchema = SchemaFactory.createForClass(TripHistory)
