import { IsString, IsOptional } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  profilePictureName: string;

  @IsString()
  @IsOptional()
  userName: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  aboutMe: string;
}
