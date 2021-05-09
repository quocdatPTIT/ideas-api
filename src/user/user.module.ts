import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { UserEntity } from './user.entity';
import { APP_PIPE } from '@nestjs/core';
import { Validation } from '../shared/validation.pipe';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_PIPE,
      useClass: Validation,
    },
  ],
})
export class UserModule {}
