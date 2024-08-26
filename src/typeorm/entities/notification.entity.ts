import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateUpdateDeleteEntity } from './common.entity';

@Entity('notification')
export class NotificationEntity extends CreateUpdateDeleteEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  from: Date;

  @Column()
  to: Date;
}
