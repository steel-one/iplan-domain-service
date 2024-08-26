import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('application')
export class ApplicationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  link: string;
}
