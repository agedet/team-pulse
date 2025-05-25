import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsNumber()
  teamId: number;
  
  @IsString()
  @IsNotEmpty()
  teamName: string;
}