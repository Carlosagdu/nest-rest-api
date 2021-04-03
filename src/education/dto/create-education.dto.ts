import { IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  place: string;

  @IsString()
  from: string;

  @IsString()
  to: string;
}
