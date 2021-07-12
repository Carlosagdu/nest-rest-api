import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/posts.util';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    this.postsService.create(createPostDto);
    return {
      message: 'Posts created',
    };
  }

  @Post('uploadPicture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './pictures',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return response;
  }

  @Get('pictures/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './pictures' });
  }

  @Get('english')
  findAllEnglishPosts() {
    return this.postsService.findAllEnglish();
  }

  @Get('spanish')
  findAllSpanishPosts() {
    return this.postsService.findAllSpanish();
  }

  @Get('english/:id')
  findOneEnglish(@Param('id') id: string) {
    return this.postsService.findOneEnglish(id);
  }

  @Get('spanish/:id')
  findOneSpanish(@Param('id') id: string) {
    return this.postsService.findOneSpanish(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
