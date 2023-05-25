import { User } from '@prisma/client';

export type JwtPayloadType = Pick<User, 'id' | 'name'> & {
  iat: number;
  exp: number;
  aud: string;
  iss: string;
};
