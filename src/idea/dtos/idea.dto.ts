import { IsString } from 'class-validator';

export class IdeaDto {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
