import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  isChecked: boolean;

  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  createdBy: string;
}

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
