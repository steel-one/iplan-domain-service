import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaleEntity } from '../../typeorm/entities';
import { LocalesController } from './locales.controller';
import { LocalesService } from './locales.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocaleEntity])],
  controllers: [LocalesController],
  providers: [LocalesService],
})
export class LocalesModule {}
