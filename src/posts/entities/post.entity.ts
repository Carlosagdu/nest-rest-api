import { IsOptional, IsString } from 'class-validator';

export class Post {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  createdAt: Date;
}
