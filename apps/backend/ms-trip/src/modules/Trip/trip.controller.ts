import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { MicroServiceNames } from '@shared/constants/constant'
import { TripService } from './trip.service'
import TripMessagePattern from '@shared/constants/MSMessagePatterns/trip.messagePattern'
import TripInfoDTO from '@shared/DTO/Trip/tripInfo.DTO'

@Controller(MicroServiceNames.TRIP)
export class TripController {
    constructor(private readonly tripService: TripService) {}
    /**
     * @description Create a new trip
     * @param payload - The payload containing trip information
     * @returns The created trip information
     */
    @MessagePattern(TripMessagePattern.ADD_TRIP)
    addTrip(@Payload() payload: TripInfoDTO) {
        return this.tripService.addTrip(payload)
    }
}
