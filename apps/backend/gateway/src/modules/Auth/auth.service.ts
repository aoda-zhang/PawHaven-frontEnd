import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import CreateUserDTO from '@shared/DTO/Auth/create-user.dto'
import { MSClientNames } from '@shared/constants/constant'
import { ClientProxy } from '@nestjs/microservices'
import AuthMessagePattern from '@shared/constants/MSMessagePatterns/auth.messagePattern'
import { Schema } from 'mongoose'

@Injectable()
export default class AuthService {
    constructor(
        @Inject(MSClientNames.MS_AUTH)
        private readonly authClient: ClientProxy
    ) {}

    register = async (userInfo: CreateUserDTO) => {
        try {
            return await this.authClient.send(AuthMessagePattern.REGISTER, userInfo)
        } catch (error) {
            throw new BadRequestException(`register failed :${error}`)
        }
    }

    login = async (userName: string, password: string) => {
        try {
            return await this.authClient.send(AuthMessagePattern.LOGIN, { userName, password })
        } catch (error) {
            throw new BadRequestException(`Login failed:${error}`)
        }
    }

    refresh = async (refreshToken: { userName: string; userID: Schema.Types.ObjectId }) => {
        try {
            return await this.authClient.send(AuthMessagePattern.LOGIN, refreshToken)
        } catch (error) {
            throw new BadRequestException(`generate refresh token failed :${error}`)
        }
    }
}
