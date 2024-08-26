import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PaymentEntity } from '../../typeorm/entities';
import { CreateUpdatePaymentDto } from './dto/create.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentEntity)
    private repository: Repository<PaymentEntity>,
  ) {}

  async getManyAndCount(args?): Promise<[PaymentEntity[], number]> {
    const qb = this.repository.createQueryBuilder();
    if (args) {
      if (args.ids) {
        qb.andWhere({ id: In(args.ids) });
      }

      if (args.search) {
        const search = `%${args.search}%`;
        qb.andWhere('"name" ILIKE :search', { search });
      }

      if (args.orderBy) {
        const { sort, order, nulls } = args.orderBy;
        qb.orderBy(
          `"${sort}"`,
          (order as 'ASC' | 'DESC') || 'ASC',
          (nulls as 'NULLS LAST' | 'NULLS FIRST') || 'NULLS LAST',
        );
      }

      if (args.paginate) {
        const { page, perPage } = args.paginate;
        qb.offset(page * perPage);
        qb.limit(perPage);
      }
    }
    return qb.getManyAndCount();
  }

  async create(payload: CreateUpdatePaymentDto) {
    const qb = this.repository
      .createQueryBuilder()
      .insert()
      .values(payload)
      .returning('*');

    const result = await qb.execute();
    return result.generatedMaps[0] as PaymentEntity;
  }

  async update(payload: CreateUpdatePaymentDto) {
    const result = await this.repository.save(payload);
    return result as PaymentEntity;
  }
}
