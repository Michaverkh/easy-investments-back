import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const SetRolesToMetadata = (...roles: string[]) =>
  SetMetadata(ROLES_KEY, roles);
