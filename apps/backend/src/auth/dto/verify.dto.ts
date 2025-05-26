import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";


export class VerifyUserDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    otp: string;
}