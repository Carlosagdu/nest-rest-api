import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    return await this.prismaService.post.create({ data: createPostDto });
  }

  async findAll() {
    return await this.prismaService.post.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.post.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return await this.prismaService.post.update({
      where: {
        id,
      },
      data: updatePostDto,
    });
  }

  async remove(id: string) {
    return await this.prismaService.post.delete({
      where: { id },
    });
  }
}
