import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';

@Injectable()
export class EducationService {
  constructor(private prismaService: PrismaService) {}
  async create(createEducationDto: CreateEducationDto) {
    return await this.prismaService.record.create({
      data: {
        ...createEducationDto,
        category: 'EDUCATION',
      },
    });
  }

  async findAll() {
    return await this.prismaService.record.findMany({
      where: {
        category: 'EDUCATION',
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.record.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEducationDto: UpdateEducationDto) {
    return await this.prismaService.record.update({
      where: {
        id,
      },
      data: updateEducationDto,
    });
  }

  async remove(id: number) {
    return await this.prismaService.record.delete({
      where: {
        id,
      },
    });
  }
}
