import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { Decorators } from '@shared/constants/enum'
import {
    HttpBusinessCode,
    HttpBusinessMappingCode,
    HttpReqHeader
} from '@shared/core/httpClient/interface'
import trime from '@shared/utils/trime'
import CryptoJS from 'crypto-js'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export type SignParams = {
    request: Record<string, any>
    clientTimestamp: string
}
export type CompareSignParams = SignParams & {
    clientSign: string
}

// Please use the decorator @NoSign() to skip the sign validation

@Injectable()
export default class SignGuard implements CanActivate {
    private privateKey: string
    private requestGap: number
    constructor(
        private reflector: Reflector,
        private configService: ConfigService
    ) {
        this.privateKey = this.configService.get<string>('auth.privateKey') ?? ''
        this.requestGap = this.configService.get<number>('auth.requestGap')
    }

    isTimestampAvailable = (clientTimestamp): boolean => {
        const serverUTCTimestamp = Math.floor(Date.now() / 1000)
        // Check the timestamp is valid to prevent request replay attack
        const isPassed =
            serverUTCTimestamp > 0 &&
            clientTimestamp > 0 &&
            serverUTCTimestamp >= clientTimestamp &&
            this.requestGap >= Math.abs(serverUTCTimestamp - clientTimestamp)
        return isPassed
    }

    private formatUrl = (url: string) => {
        return url
            .replace(this.configService.get<string>('http.prefix'), '')
            .replace(/\//g, '')
            ?.toLowerCase()
    }

    private generateSign = ({ request, clientTimestamp }: SignParams): string => {
        const { body, url = '', method = '' } = request
        const requestBody = Object.keys(body ?? {})?.length > 0 ? JSON.stringify(request?.body) : ''
        return CryptoJS.HmacSHA256(
            `${this.formatUrl(url)}>${requestBody}+${method?.toUpperCase()}|${clientTimestamp}`,
            this.privateKey
        ).toString(CryptoJS.enc.Hex)
    }

    compareSign = ({ clientSign, request, clientTimestamp }: CompareSignParams): boolean => {
        return clientSign === this.generateSign({ request, clientTimestamp })
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const response = context.switchToHttp().getResponse()
        const isNoSignReq = this.reflector.getAllAndOverride<boolean>(Decorators.noSign, [
            context.getHandler(),
            context.getClass()
        ])

        try {
            // skip verify Sign if isNoSignReq route or NO enable Sign
            if (!this.configService.get('auth.enableSign') || isNoSignReq) {
                return true
            }
            const clientTimestamp = `${request?.headers?.[HttpReqHeader?.timestamp] ?? ''}`
            const clientSign = request?.headers?.[HttpReqHeader?.sign]

            // verify the timestamp is valid
            const isTimestampAvailable = this.isTimestampAvailable(clientTimestamp)

            // verify the sign between client and server
            const isPassedSign = this.compareSign({
                request,
                clientTimestamp,
                clientSign
            })
            return isTimestampAvailable && isPassedSign
        } catch (error) {
            switch (trime(error?.message)) {
                case HttpBusinessCode.jwtexpired || HttpBusinessCode.invalidToken:
                    response.data = HttpBusinessMappingCode.jwtexpired
                    break
                default:
                    break
            }
            throw new BadRequestException(`error:${error}`)
        }
    }
}
