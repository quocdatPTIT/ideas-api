import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { Validation } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.guard';
import { User } from '../user/user.decorator';

import { IdeaService } from './idea.service';
import { IdeaEntity } from './idea.entity';
import { IdeaDto } from './dtos/idea.dto';
import { BaseResponse } from 'src/models/base-response.model';

@Controller('api/ideas')
export class IdeaController {
  private logger = new Logger('IdeaController');
  constructor(private readonly ideaService: IdeaService) {}

  @Post('get-all-ideas')
  async getALlIdeas(@Body('skip') skip: number, @Body('take') take: number) {
    const ideas = await this.ideaService.getALlIdeas(skip, take);
    const response: BaseResponse<[IdeaEntity[], number]> = {
      statusCode: HttpStatus.OK,
      items: ideas[0],
      totalItems: ideas[1],
    };
    return response;
  }

  @Post('create-idea')
  @UseGuards(new AuthGuard())
  @UsePipes(new Validation())
  async createIdea(@User('id') userId, @Body() data: IdeaDto) {
    this.logData({ userId, data });
    // const isCreated = await this.ideaService.createIdea(userId, data);
    // const response: BaseResponse<boolean> = {
    //   statusCode: HttpStatus.CREATED,
    //   isDeleted: isCreated,
    // };
    // return response;
  }

  @Get('get-idea-by-id/:id')
  async getIdeaById(@Param('id') id: string) {
    const idea = await this.ideaService.getIdeaById(id);
    const response: BaseResponse<IdeaEntity> = {
      statusCode: HttpStatus.OK,
      item: idea ? idea : null,
    };
    return response;
  }

  @Put('update-idea/:id')
  async updateIdea(@Param('id') id: string, @Body() idea: IdeaDto) {
    const updatedIdea = await this.ideaService.updateIdea(id, idea);
    const response: BaseResponse<IdeaEntity> = {
      statusCode: HttpStatus.OK,
      item: updatedIdea ? updatedIdea : null,
    };
    return response;
  }

  @Delete('delete-idea/:id')
  async deleteIdea(@Param('id') id: string) {
    const isDeleted = await this.ideaService.deleteIdea(id);
    const response: BaseResponse<boolean> = {
      statusCode: HttpStatus.OK,
      isDeleted: isDeleted,
    };
    return response;
  }

  private logData(options: any) {
    options.userId && this.logger.log('USER ' + JSON.stringify(options.userId));
    options.data && this.logger.log('DATA ' + JSON.stringify(options.data));
  }
}
