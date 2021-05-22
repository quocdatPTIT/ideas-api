import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { UserResponse } from './dtos/user.dto';
import { IdeaEntity } from '../idea/idea.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'creation_time' })
  creationTime: Date;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @OneToMany(type => IdeaEntity, idea => idea.author)
  ideas: IdeaEntity[];

  @BeforeInsert()
  async passwordHash() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toResponseObject(showToken = true): UserResponse {
    const { id, creationTime, username, token } = this;
    const responseObject: UserResponse = { id, creationTime, username };

    if (showToken) {
      responseObject.token = token;
    }
    return responseObject;
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username } = this;
    return jwt.sign({ id, username }, process.env.SECRET, { expiresIn: '7d' });
  }
}
