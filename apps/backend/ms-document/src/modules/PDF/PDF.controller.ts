import { BadRequestException, Body, Controller, Post, Res } from '@nestjs/common'
import { Payload } from '@nestjs/microservices'
import CreatePDFDTO from '@shared/DTO/Document/create-PDF.DTO'
import { PDFService } from './PDF.service'
import { Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { EnvConstant } from '@shared/constants/constant'
@Controller('pdf')
export default class PDFController {
    constructor(
        private readonly pdfService: PDFService,
        private readonly configService: ConfigService
    ) {}

    // @MessagePattern(documentMessagePattern.GET_DOCUMENT_BY_ID)
    async generatePdf(@Payload() payload: CreatePDFDTO) {
        return await this.pdfService.generatePDF(payload)
    }

    @Post('v1/preview')
    async generatePDFPreview(@Body() payload: CreatePDFDTO, @Res() res: Response) {
        // Only for develop test
        if (this.configService.get('http.env') === EnvConstant.prod) {
            throw new BadRequestException('Forbidden request!')
        }
        const PDFData = await this.pdfService.generatePDF(payload)
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${PDFData?.fileName}`
        })
        res.end(PDFData?.data)
    }
}
