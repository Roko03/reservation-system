import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Role } from '@prisma/client';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { EditReservationDto } from './dto';

@Controller('reservation')
export class ReservationController {
  constructor(private reservationService: ReservationService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  getAllReservations(
    @Query('pageSize') pageSize: string,
    @Query('currentPage') currentPage: string,
    @Query('objectId') objectId?: string,
    @Query('status') status?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
  ) {
    const size = pageSize ? parseInt(pageSize, 10) : 10;
    const page = currentPage ? parseInt(currentPage, 10) : 0;

    return this.reservationService.getAllReservations(size, page, {
      objectId,
      status,
      dateFrom,
      dateTo,
    });
  }

  @Patch('/:id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  approveReservation(@Param('id') id: string, @Body() dto: EditReservationDto) {
    return this.reservationService.approveReservation(id, dto);
  }
}
