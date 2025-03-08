import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
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

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  getAllUser(
    @Query('pageSize') pageSize: string,
    @Query('currentPage') currentPage: string,
    @Query('search') search?: string,
  ) {
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const page = currentPage ? parseInt(currentPage, 10) : 0;

    return this.userService.getAllUsers(size, page, search);
  }

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
