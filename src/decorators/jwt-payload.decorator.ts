import { ExecutionContext, NotFoundException, createParamDecorator } from '@nestjs/common';
import { JwtPayloadType } from 'src/common/types/jwt-payload.types';

export const JwtPayload = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();

  if (!request.payload) throw new NotFoundException('Usuário não existe');

  return request.payload;
});
