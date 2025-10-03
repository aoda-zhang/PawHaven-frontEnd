import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import HttpClientService from '@shared/core/httpClient/HttpClient.service';

@Injectable()
export class DocumentService {
  private readonly httpClient;

  constructor(
    private readonly http: HttpClientService,
    private readonly configService: ConfigService,
  ) {
    this.httpClient = this.http.create(
      this.configService.get('documentService.baseURL') || '',
    );
  }

  getDefaultTripViews = async () => {
    try {
      return await this.httpClient.get('/file/v1/default-trip-views');
    } catch (error) {
      throw new Error(`Error fetching default trip views: ${error}`);
    }
  };
}
