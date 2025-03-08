import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { MeService } from './me.service';
import { Role } from '@prisma/client';
import { GetCurrentUserId } from '../common/decorators';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { EditReservationDto } from './dto';

@Controller('me')
export class MeController {
  constructor(private meService: MeService) {}

  @Get()
  getMe(@GetCurrentUserId() userId: string) {
    return this.meService.getMe(userId);
  }

  @Get('/reservation')
  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  getUserReservation(@GetCurrentUserId() userId: string) {
    return this.meService.getUserReservation(userId);
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
