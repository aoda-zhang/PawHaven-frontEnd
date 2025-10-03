import { Body, Controller, Post } from '@nestjs/common'
import CreateUserDTO from '@shared/DTO/Auth/create-user.dto'
import AuthService from './auth.service'
import { Schema } from 'mongoose'
import NoToken from './decorators/noToken.decorator'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @NoToken()
    @Post('v1/register')
    register(@Body() userInfo: CreateUserDTO) {
        return this.authService.register(userInfo)
    }

    @NoToken()
    @Post('v1/login')
    async login(@Body() userInfo: { userName: string; password: string }) {
        return this.authService.login(userInfo?.userName, userInfo?.password)
    }

    @NoToken()
    @Post('v1/refresh')
    async refresh(
        @Body() body: { refreshToken: { userName: string; userID: Schema.Types.ObjectId } }
    ) {
        return this.authService.refresh(body?.refreshToken)
    }
}
