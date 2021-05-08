import { ValidationIdeaDto } from './pipe/validation-idea-dto.pipe';
import { BaseResponse } from 'src/models/base-response.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { IdeaDto } from './dtos/idea.dto';
import { IdeaEntity } from './idea.entity';
import { IdeaService } from './idea.service';

@Controller('idea')
export class IdeaController {
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
  async createIdea(@Body(new ValidationIdeaDto()) newIdea: IdeaDto) {
    const isCreated = await this.ideaService.createIdea(newIdea);
    const response: BaseResponse<boolean> = {
      statusCode: HttpStatus.CREATED,
      isDeleted: isCreated,
    };
    return response;
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
}
