import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MeService } from './me.service';
import { Role } from '@prisma/client';
import { GetCurrentUserId } from '../common/decorators';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { EditReservationDto, EditUserDto } from './dto';
import { Response } from 'express';

@Controller('me')
export class MeController {
  constructor(private meService: MeService) {}

  @Get()
  getMe(@GetCurrentUserId() userId: string) {
    return this.meService.getMe(userId);
  }

  @Patch()
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  editUser(@GetCurrentUserId() userId: string, @Body() dto: EditUserDto) {
    return this.meService.editUser(userId, dto);
  }

  @Delete()
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  deleteUser(
    @GetCurrentUserId() userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.meService.deleteUser(userId, res);
  }

  @Get('/reservation')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getUserReservation(
    @GetCurrentUserId() userId: string,
    @Query('pageSize') pageSize: string,
    @Query('currentPage') currentPage: string,
  ) {
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const page = currentPage ? parseInt(currentPage, 10) : 0;

    return this.meService.getUserReservation(userId, size, page);
  }

  @Get('/reservation/:id')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getUserReservationById(
    @GetCurrentUserId() userId: string,
    @Param('id') reservationId: string,
  ) {
    return this.meService.getUserReservationById(userId, reservationId);
  }

  @Patch('/reservation/:id')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  editUserReservationsById(
    @GetCurrentUserId() userId: string,
    @Param('id') reservationId: string,
    @Body() dto: EditReservationDto,
  ) {
    return this.meService.editUserReservationsById(userId, reservationId, dto);
  }

  @Delete('/reservation/:id')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  deleteUserReservationsById(
    @GetCurrentUserId() userId: string,
    @Param('id') reservationId: string,
  ) {
    return this.meService.deleteUserReservationsById(userId, reservationId);
  }
}
