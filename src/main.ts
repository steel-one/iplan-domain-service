import { ReflectionService } from '@grpc/reflection';
import { NestHybridApplicationOptions } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const httpPort = configService.get('Iplan_Domain_Http_Port') as number;
  const grpcPort = configService.get('Iplan_Domain_Grpc_Port') as number;
  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.GRPC,
    options: {
      package: [
        'grpc.health.v1',
        'application',
        'event',
        'locale',
        'notification',
        'payment',
        'user',
      ],
      protoPath: [
        join(__dirname, '../protos/health.proto'),
        join(__dirname, '../protos/application.proto'),
        join(__dirname, '../protos/event.proto'),
        join(__dirname, '../protos/locale.proto'),
        join(__dirname, '../protos/notification.proto'),
        join(__dirname, '../protos/payment.proto'),
        join(__dirname, '../protos/user.proto'),
      ],
      url: `0.0.0.0:${grpcPort}`,
      loader: {
        includeDirs: [join(__dirname, '..', 'protos')],
      },
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  };
  const hybridOptions: NestHybridApplicationOptions = {
    inheritAppConfig: true,
  };
  app.connectMicroservice<MicroserviceOptions>(
    microserviceOptions,
    hybridOptions,
  );
  await app.startAllMicroservices();
  await app.listen(httpPort);
  console.log(`Microservice running`);
  console.log(`http: ${httpPort}`);
  console.log(`grpc: ${grpcPort}`);
}

bootstrap();
