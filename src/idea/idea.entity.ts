import { BaseEntity } from './../base-entity/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('idea')
export class IdeaEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 250  })
  idea: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;
}