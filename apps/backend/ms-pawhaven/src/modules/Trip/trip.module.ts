import { Module } from '@nestjs/common';
import TripDBCollection from 'src/models/trip.DBcollection';
import { TripHistorySchema } from 'src/models/tripInfo.schema';
import { MongooseModule } from '@nestjs/mongoose';

import { TripService } from './trip.service';
import { TripController } from './trip.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TripDBCollection.HISTORY, schema: TripHistorySchema },
    ]),
  ],
  controllers: [TripController],
  providers: [TripService],
  exports: [TripService],
})
export class TripModule {}
