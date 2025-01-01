import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  makeUser(@Body() dto: CreateUserDto) {
    return this.userService.makeUser();
  }
}
