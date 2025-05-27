import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateMemberStatusDto {
  @IsString()
  @IsIn(['working', 'available', 'onleave'], {
    message: 'Status must be one of: working, available, or onleave',
  })
  newStatus: string;
}