import { IdeaEntity } from './idea.entity';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { APP_PIPE } from '@nestjs/core';
import { Validation } from '../shared/validation.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity])],
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
