import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserResponse {
  id: string;
  username: string;
  creationTime: Date;
  token?: string;
}
