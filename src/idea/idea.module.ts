import { IdeaEntity } from './idea.entity';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { APP_PIPE } from '@nestjs/core';
import { Validation } from '../shared/validation.pipe';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity, UserEntity])],
  controllers: [IdeaController],
  providers: [
    IdeaService,
    {
      provide: APP_PIPE,
      useClass: Validation,
    },
  ],
})
export class IdeaModule {}
