import { IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  userName: string;

  @IsString()
  email: string;

  @IsString()
  comment: string;

  @IsOptional()
  createdAt: Date;

  @IsString()
  postId: string;
}
