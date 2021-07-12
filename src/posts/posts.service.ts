import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prismaService: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const spanishPost = await this.prismaService.spanishPost.create({
      data: {
        title: createPostDto.spanishTitle,
        content: createPostDto.contentSpanish,
        pictureName: createPostDto.pictureName,
      },
    });

    const englishPost = await this.prismaService.englishPost.create({
      data: {
        title: createPostDto.englishTitle,
        content: createPostDto.contentEnglish,
        pictureName: createPostDto.pictureName,
      },
    });

    await this.prismaService.postLanguage.create({
      data: {
        spanishPostId: spanishPost.id,
        englishPostId: englishPost.id,
      },
    });
  }

  // spanish posts

  async findAllSpanish() {
    return await this.prismaService.spanishPost.findMany();
  }

  // english posts

  async findAllEnglish() {
    return await this.prismaService.englishPost.findMany();
  }

  async findOne(id: string) {
    // return await this.prismaService.post.findUnique({
    //   where: {
    //     id,
    //   },
    // });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    // return await this.prismaService.post.update({
    //   where: {
    //     id,
    //   },
    //   data: updatePostDto,
    // });
  }

  async remove(id: string) {
    // return await this.prismaService.post.delete({
    //   where: { id },
    // });
  }
}
