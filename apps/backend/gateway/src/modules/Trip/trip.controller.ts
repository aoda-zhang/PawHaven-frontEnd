import { Body, Controller, Post } from '@nestjs/common'
import { MicroServiceNames } from '@shared/constants/constant'
import TripService from './trip.service'
import TripInfoDTO from '@shared/DTO/Trip/tripInfo.DTO'
@Controller(MicroServiceNames.TRIP)
export class MS_TripController {
    constructor(private readonly tripService: TripService) {}

    @Post('v1/addTrip')
    createTrip(@Body() tripInfo: TripInfoDTO) {
        return this.tripService.addTrip(tripInfo)
    }
}
