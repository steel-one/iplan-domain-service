import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CreateUpdateDeleteEntity } from './common.entity';

@Entity('user')
export class UserEntity extends CreateUpdateDeleteEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 200, unique: true })
  name: string;

  @Column({ length: 200, name: 'first_name' })
  firstName: string;

  @Column({ length: 200, name: 'last_name' })
  lastName: string;

  @Column({ length: 50, unique: true })
  email: string;
}
