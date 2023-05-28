import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterAuthDto {
  @IsString()
  @Length(3, 25)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: number
}
