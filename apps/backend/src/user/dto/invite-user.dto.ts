import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export class InviteUserDto {
  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  teamId: string;
}