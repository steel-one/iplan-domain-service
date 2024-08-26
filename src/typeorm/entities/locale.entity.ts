import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('locale')
export class LocaleEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 200, unique: true })
  name: string;
}
