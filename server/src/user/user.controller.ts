import { Body, Controller, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { EditUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch()
  editUser(@Body() dto: EditUserDto) {
    return this.userService.editUser(dto);
  }

  @Delete()
  deleteUser() {
    return this.userService.deleteUser();
  }
}
