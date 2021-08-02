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
var fs = require('fs');
import { FileInterceptor } from '@nestjs/platform-express';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Express } from 'express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from './utils/posts.util';
import { CreateCommentDto } from './dto/create-comment.dto';
var AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
});
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
    fs.readFile(file.path, (err, data) => {
      if (err) throw err;
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.filename,
        Body: data,
      };
      s3.upload(params, (err, data) => {
        if (err) {
          console.log('there was an error', err);
        } else {
          console.log('successfully uploaded data');
        }
      });
    });
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

  @Get('latest')
  findLatestPosts() {
    return this.postsService.getLatestPosts();
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

  @Post('addComment')
  addPostComment(@Body() createCommentDto: CreateCommentDto) {
    return this.postsService.createComment(createCommentDto);
  }

  @Delete('comment/:id')
  deleteCommentById(@Param('id') id: string) {
    return this.postsService.deleteCommentById(id);
  }
}
