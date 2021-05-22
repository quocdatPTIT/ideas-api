import { BaseEntity } from './../base-entity/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity('idea')
export class IdeaEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 250 })
  idea: string;

  @Column({ type: 'varchar', length: 2000 })
  description: string;

  @ManyToOne(type => UserEntity, author => author.ideas)
  author: UserEntity;
}
