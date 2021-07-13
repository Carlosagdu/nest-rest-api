import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        userId: id,
      },
      select: {
        profilePictureName: true,
        userName: true,
        email: true,
        name: true,
        aboutMe: true,
      },
    });
  }

  async update(id: string, updateUserDto: UserDto) {
    return await this.prismaService.user.update({
      where: {
        userId: id,
      },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
