import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class RegisterUserDto {
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    role?: 'admin' | 'member';

    @IsNotEmpty()
    teamId: string;
}