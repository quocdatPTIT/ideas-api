import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'creation_time',
  })
  creationTime: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
    name: 'last_modification_time',
  })
  @UpdateDateColumn()
  lastModificationTime?: Date;

  @Column({ type: 'uuid', nullable: true, name: 'last_modification_by' })
  lastModificationBy: string;
}
