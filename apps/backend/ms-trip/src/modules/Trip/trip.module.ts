import { Module } from '@nestjs/common'
import { TripController } from './trip.controller'
import { TripService } from './trip.service'
import TripDBCollection from 'src/models/trip.DBcollection'
import { TripHistorySchema } from 'src/models/tripInfo.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: TripDBCollection.HISTORY, schema: TripHistorySchema }])
    ],
    controllers: [TripController],
    providers: [TripService],
    exports: [TripService]
})
export class TripModule {}
