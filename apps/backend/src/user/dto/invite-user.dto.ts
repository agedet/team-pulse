import { IsEmail, IsEnum, IsString } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

export class InviteUserDto {
  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  teamRole: UserRole;

  @IsString()
  teamId: string;
}