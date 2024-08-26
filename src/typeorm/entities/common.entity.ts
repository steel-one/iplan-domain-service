import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GrpcDateTransformer } from '../../utils/convertTimestamp';

export class SoftDeleteEntity {
  @DeleteDateColumn({
    name: 'deleted_utc',
    type: 'timestamp',
    transformer: GrpcDateTransformer,
    nullable: true,
  })
  deletedUtc: Date;

  @Column({ nullable: true, name: 'deleted_by' })
  deletedBy: string;
}

export class CreateUpdateEntity {
  @CreateDateColumn({
    name: 'created_utc',
    type: 'timestamp',
    transformer: GrpcDateTransformer,
  })
  createdUtc: Date;

  @Column({ name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({
    name: 'updated_utc',
    type: 'timestamp',
    transformer: GrpcDateTransformer,
  })
  updatedUtc: Date;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;
}

export class CreateUpdateDeleteEntity extends CreateUpdateEntity {
  @DeleteDateColumn({
    name: 'deleted_utc',
    type: 'timestamp',
    transformer: GrpcDateTransformer,
    nullable: true,
  })
  deletedUtc: Date;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy: string;
}
