import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateRoleDto } from './dto';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Patch('/:userId')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  editUser(@Param('userId') userId: string, @Body() dto: UpdateRoleDto) {
    return this.userService.editUser(userId, dto);
  }

  @Delete('/:userId')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
