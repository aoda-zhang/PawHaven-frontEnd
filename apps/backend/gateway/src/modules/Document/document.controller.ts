import { Controller, Get } from '@nestjs/common';
import { MicroServiceNames } from '@shared/constants/constant';
import NoToken from '@modules/Auth/decorators/noToken.decorator';
import NoSign from '@modules/Auth/decorators/noSIgn.decorator';

import { DocumentService } from './document.service';

@Controller(MicroServiceNames.DOCUMENT)
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @NoToken()
  @NoSign()
  @Get('/v1/default-trip-views')
  async getDefaultTripViews(): Promise<unknown> {
    return this.documentService.getDefaultTripViews();
  }
}
