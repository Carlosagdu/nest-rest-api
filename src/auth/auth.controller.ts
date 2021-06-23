import {
  Controller,
  Get,
  Body,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const response = await this.authService.validateUser(data);
    if (!response) {
      return { statusCode: HttpStatus.UNAUTHORIZED, message: 'wrong password' };
    } else {
      return { statusCode: HttpStatus.OK, message: 'welcome abroad' };
    }
  }

  @Post('changePW')
  async changePassword(@Body() body: object) {
    const response = await this.authService.changePassword(body);
    if (!response) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        message: 'password doesnt match',
      };
    } else {
      return { statusCode: HttpStatus.OK, message: 'password updated' };
    }
  }

  @Post('signup')
  async signup(@Body() data: LoginDto) {
    const serviceResponse = await this.authService.createUser(data);
    if (!serviceResponse) {
      return { statusCode: HttpStatus.UNAUTHORIZED };
    } else {
      return { statusCode: HttpStatus.OK };
    }
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('facebook/success')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

  @Get('twitter')
  @UseGuards(AuthGuard('twitter'))
  async twitterLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('twitter/success')
  @UseGuards(AuthGuard('twiter'))
  async twitterLoginRedirect(@Req() req: Request): Promise<any> {
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }
}
