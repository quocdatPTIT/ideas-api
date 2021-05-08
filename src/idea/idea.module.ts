import { ValidationIdeaDto } from './pipe/validation-idea-dto.pipe';
import { IdeaEntity } from './idea.entity';
import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([IdeaEntity])],
  controllers: [IdeaController],
  providers: [
    IdeaService,
    {
      provide: APP_PIPE,
      useClass: ValidationIdeaDto,
    },
  ],
})
export class IdeaModule {}
