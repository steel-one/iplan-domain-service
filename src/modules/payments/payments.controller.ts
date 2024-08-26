import { Body, Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ListReq, ListRes, Payment } from '@proto.ts/payment';
import { TUserId, UserId } from 'src/auth/user-id.decorator';
import { CreateUpdatePaymentDto } from './dto/create.dto';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private srv: PaymentsService) {}

  @GrpcMethod('PaymentGrpcService')
  async list(@Body() args: ListReq): Promise<ListRes> {
    const [list, totalCount] = await this.srv.getManyAndCount(args);
    return { list, totalCount };
  }

  @GrpcMethod('PaymentGrpcService')
  async create(
    @Body() payload: CreateUpdatePaymentDto,
    @UserId() createdBy: TUserId,
  ): Promise<Payment> {
    return this.srv.create({ ...payload, createdBy });
  }

  @GrpcMethod('PaymentGrpcService')
  async update(
    @Body() payload: CreateUpdatePaymentDto,
    @UserId() updatedBy: TUserId,
  ): Promise<Payment> {
    return this.srv.update({ ...payload, updatedBy });
  }
}
