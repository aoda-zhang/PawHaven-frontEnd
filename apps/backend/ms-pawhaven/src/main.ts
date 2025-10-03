import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AllRpcExceptionsFilter } from '@shared/core/httpClient/rpcExceptionFillter';

import AppModule from './app.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const configService = appContext.get(ConfigService);

  const port = configService.get<number>('http.port', 8081);
  const host = configService.get<string>('http.host', '0.0.0.0');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host,
        port,
      },
    },
  );
  app.useGlobalFilters(new AllRpcExceptionsFilter());

  await app.listen();
}
bootstrap();
