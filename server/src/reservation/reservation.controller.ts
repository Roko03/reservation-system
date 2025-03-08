import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
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
  getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  @Patch('/:id')
  @Roles(Role.ADMIN, Role.SUPERADMIN)
  @UseGuards(RolesGuard)
  approveReservation(@Param('id') id: string, @Body() dto: EditReservationDto) {
    return this.reservationService.approveReservation(id, dto);
  }
}
