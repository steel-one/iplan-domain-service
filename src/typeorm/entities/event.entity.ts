import { Column, Entity, PrimaryColumn } from 'typeorm';
import { GrpcDateTransformer } from '../../utils/convertTimestamp';
import { CreateUpdateDeleteEntity } from './common.entity';

@Entity('notification')
export class NotificationEntity extends CreateUpdateDeleteEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp', transformer: GrpcDateTransformer })
  start: Date;

  @Column({ type: 'timestamp', transformer: GrpcDateTransformer })
  end: Date;
}
