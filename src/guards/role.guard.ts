import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getClass(), context.getHandler()]);
    console.log({ requiredRoles });
    if (!requiredRoles.length) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role: Role) => role <= user.role);
  }
}
