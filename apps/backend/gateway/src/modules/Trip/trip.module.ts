import { Module } from '@nestjs/common'
import { MS_TripController } from './trip.controller'
import TripService from './trip.service'

@Module({
    imports: [],
    controllers: [MS_TripController],
    providers: [TripService],
    exports: [TripService]
})
export class TripModule {}
