import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  createdAt: Date;
}
