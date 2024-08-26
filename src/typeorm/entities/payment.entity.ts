import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateUpdateDeleteEntity } from './common.entity';

@Entity('payment')
export class PaymentEntity extends CreateUpdateDeleteEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'event_id' })
  eventId: string;

  @Column('decimal', { precision: 6, scale: 2 })
  amount: number;
}
