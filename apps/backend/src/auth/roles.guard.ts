import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const teamRoles = this.reflector.get<string[]>('teamRoles', context.getHandler());
    if (!teamRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (teamRoles.includes(user.teamRole)) {
      return true;
    }

    throw new ForbiddenException('You do not have permission (teamRoles)');
  }
}
