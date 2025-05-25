import { SetMetadata } from '@nestjs/common';

export const TeamRoles = (...teamRoles: string[]) => SetMetadata('teamRoles', teamRoles);
