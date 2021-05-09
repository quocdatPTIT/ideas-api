import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/user.dto';
import { Validation } from '../shared/validation.pipe';
import { BaseResponse } from '../models/base-response.model';
import { AuthGuard } from '../shared/auth.guard';
import { User } from './user.decorator';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('get-users')
  @UseGuards(new AuthGuard())
  async getAllUsers(@User() user) {
    console.log(user);
    const users = await this.userService.getAllUsers();
    const response: BaseResponse<UserDto> = {
      statusCode: HttpStatus.OK,
      totalItems: users[1],
      items: users[0].map(user => user.toResponseObject(false)),
    };
    return response;
  }

  @Post('login')
  @UsePipes(new Validation())
  async login(@Body() data: UserDto) {
    return await this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new Validation())
  async register(@Body() data: UserDto) {
    return await this.userService.register(data);
  }
}
