import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdeaEntity } from './idea.entity';
import { IdeaDto } from './dtos/idea.dto';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createIdea(userId: string, newIdea: IdeaDto): Promise<boolean> {
    try {
      await this.ideaRepository
        .createQueryBuilder()
        .insert()
        .into(IdeaEntity)
        .values({ idea: newIdea.title, description: newIdea.description })
        .execute();

      return true;
    } catch (error) {
      throw new BadRequestException('Oops!!!');
    }
  }

  async getALlIdeas(
    skip: number,
    take: number,
  ): Promise<[IdeaEntity[], number]> {
    try {
      return this.ideaRepository
        .createQueryBuilder('idea')
        .select([
          'idea.id',
          'idea.idea',
          'idea.description',
          'idea.creationTime',
          'user.id',
          'user.username',
        ])
        .innerJoin('idea.author', 'user')
        .where('idea.is_deleted = false')
        .offset(skip)
        .limit(take)
        .getManyAndCount();
    } catch (error) {
      throw new BadRequestException('Oops!!!');
    }
  }

  async getIdeaById(ideaId: string): Promise<IdeaEntity> {
    try {
      return await this.queryIdeaById(ideaId);
    } catch (error) {
      throw new NotFoundException('Could not find idea');
    }
  }

  async updateIdea(ideaId: string, idea: IdeaDto): Promise<IdeaEntity> {
    try {
      await this.ideaRepository
        .createQueryBuilder('idea')
        .update(IdeaEntity)
        .set({
          idea: idea.title,
          description: idea.description,
        })
        .where('id = :id', { id: ideaId })
        .execute();

      return await this.queryIdeaById(ideaId);
    } catch (error) {
      throw new NotFoundException('Could not find idea');
    }
  }

  async deleteIdea(ideaId: string): Promise<boolean> {
    try {
      await this.ideaRepository
        .createQueryBuilder('idea')
        .update(IdeaEntity)
        .set({ is_deleted: true })
        .where('id = :id', { id: ideaId })
        .execute();

      return true;
    } catch (error) {
      throw new NotFoundException('Could not find idea');
    }
  }

  private async queryIdeaById(ideaId: string) {
    return this.ideaRepository
      .createQueryBuilder('idea')
      .select(['idea.id', 'idea.idea', 'idea.description', 'idea.creationTime'])
      .where('idea.id = :id and idea.is_deleted = false', { id: ideaId })
      .getOne();
  }
}
