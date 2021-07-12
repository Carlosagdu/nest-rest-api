import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  spanishTitle: string;

  @IsString()
  contentSpanish: string;

  @IsString()
  englishTitle: string;

  @IsString()
  contentEnglish: string;

  @IsString()
  pictureName: string;

  @IsOptional()
  createdAt: Date;
}
