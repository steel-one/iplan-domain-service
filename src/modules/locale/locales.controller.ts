import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListReq, ListRes, OneReq, OneRes } from '@proto.ts/locale';
import { LocalesService } from './locales.service';

@Controller()
export class LocalesController {
  constructor(private srv: LocalesService) {}

  @GrpcMethod('LocaleGrpcService')
  async list(@Body() args: ListReq): Promise<ListRes> {
    const [list, totalCount] = await this.srv.getManyAndCount(args);
    return { list, totalCount };
  }

  @GrpcMethod('LocaleGrpcService')
  async one(@Body() args: OneReq): Promise<OneRes> {
    const node = await this.srv.getOne(args);
    return { node };
  }
}
