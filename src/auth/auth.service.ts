import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/Login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async validateUser(data: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
      select: {
        password: true,
      },
    });
    if (!user) throw new Error(`User with email ${data.email} does not exist`);
    const match = await bcrypt.compare(data.password, user.password);
    if (!match) {
      return false;
    } else {
      return true;
    }
  }

  async createUser(data: LoginDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const response = await this.prismaService.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
    console.log({
      email: response.email,
      password: response.password,
    });
    if (!response) return false;
    return true;
  }

  async changePassword(data) {
    const response = await this.validateUser({
      email: data.email,
      password: data.currentPassword,
    });
    if (!response) {
      return false;
    } else {
      await this.prismaService.user.update({
        where: { email: data.email },
        data: { password: await bcrypt.hash(data.newPassword, 10) },
      });
      return true;
    }
  }
}
