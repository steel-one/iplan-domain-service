import { IsOptional, IsString } from 'class-validator';

export class ActionDto {
  @IsString()
  @IsOptional()
  createdBy;

  @IsString()
  @IsOptional()
  updatedBy;

  @IsString()
  @IsOptional()
  deletedBy;
}
