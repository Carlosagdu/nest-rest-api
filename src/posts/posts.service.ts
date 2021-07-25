import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
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

  async findOneSpanish(id: string) {
    return await this.prismaService.spanishPost.findUnique({
      where: {
        id,
      },
    });
  }

  // english posts

  async findAllEnglish() {
    return await this.prismaService.englishPost.findMany({
      include: {
        postLanguage: {
          include: {
            comments: true,
          },
        },
      },
    });
  }

  async findOneEnglish(id: string) {
    return await this.prismaService.postLanguage.findFirst({
      where: {
        englishPostId: id,
      },
      include: {
        comments: true,
        englishPost: true,
        spanishPost: true,
      },
    });
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
    const englishPost = await this.findOneEnglish(id);
    await this.prismaService.userComments.deleteMany({
      where: {
        postLanguageId: englishPost.id,
      },
    });
    await this.prismaService.postLanguage.delete({
      where: {
        id: englishPost.id,
      },
    });
    await this.prismaService.spanishPost.delete({
      where: {
        id: englishPost.spanishPostId,
      },
    });
    await this.prismaService.englishPost.delete({
      where: {
        id: englishPost.englishPostId,
      },
    });
    return { statusCode: HttpStatus.ACCEPTED, message: 'Post deleted' };
  }

  async createComment(dto: CreateCommentDto) {
    const response = await this.prismaService.postLanguage.findFirst({
      where: {
        OR: [
          {
            spanishPostId: dto.postId,
          },
          {
            englishPostId: dto.postId,
          },
        ],
      },
      select: {
        id: true,
      },
    });

    return this.prismaService.userComments.create({
      data: {
        postLanguageId: response.id,
        userName: dto.userName,
        email: dto.email,
        comment: dto.comment,
      },
    });
  }

  async getLatestPosts() {
    return await this.prismaService.englishPost.findMany({
      include: {
        postLanguage: {
          include: {
            comments: true,
          },
        },
      },
      take: 3,
    });
  }
}
