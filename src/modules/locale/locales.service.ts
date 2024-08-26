import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocaleEntity } from '../../typeorm/entities';

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(LocaleEntity)
    private repository: Repository<LocaleEntity>,
  ) {}

  async getManyAndCount(args?): Promise<[LocaleEntity[], number]> {
    const qb = this.repository.createQueryBuilder();
    if (args) {
      if (args.orderBy) {
        const { sort, order, nulls } = args.orderBy;
        qb.orderBy(
          `"${sort}"`,
          (order as 'ASC' | 'DESC') || 'ASC',
          (nulls as 'NULLS LAST' | 'NULLS FIRST') || 'NULLS LAST',
        );
      }
    }
    return qb.getManyAndCount();
  }

  async getOne(args): Promise<LocaleEntity> {
    const qb = this.repository.createQueryBuilder().where({ id: args.id });
    return qb.getOne();
  }
}
