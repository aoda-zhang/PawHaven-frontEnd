import path from 'node:path'
import { TripModule } from '@modules/Trip/trip.module'
import { Module } from '@nestjs/common'
import SharedModule from '@shared/shared.module'
import { EnvConstant } from '@shared/constants/constant'
const currentEnv = process.env.NODE_ENV ?? 'uat'
const configFilePath = path.resolve(__dirname, `./config/${EnvConstant[currentEnv]}/env/index.yaml`)
@Module({
    imports: [
        SharedModule.forRoot({
            configFilePath
        }),
        TripModule
    ],
    providers: []
})
export class AppModule {}
