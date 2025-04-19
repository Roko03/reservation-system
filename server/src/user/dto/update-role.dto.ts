import { IsEnum } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateRoleDto {
  @IsEnum(Role, {
    message: 'Invalid role. Allowed values: SUPERADMIN, ADMIN, USER',
  })
  role: Role;
}
