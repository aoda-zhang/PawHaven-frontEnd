import { Controller, Get, Headers } from '@nestjs/common'
import { MicroServiceNames } from '@shared/constants/constant'
import DocumentService from './document.service'
import NoToken from '@modules/Auth/decorators/noToken.decorator'
import NoSign from '@modules/Auth/decorators/noSIgn.decorator'

@Controller(MicroServiceNames.DOCUMENT)
export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}

    @NoToken()
    @NoSign()
    @Get('/v1/default-trip-views')
    async getDefaultTripViews(@Headers('locale') locale: string) {
        return await this.documentService.getDefaultTripViews()
    }
}
