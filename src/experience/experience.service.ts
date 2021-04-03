import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(private prismaService: PrismaService) {}
  async create(createExperienceDto: CreateExperienceDto) {
    return await this.prismaService.record.create({
      data: {
        ...createExperienceDto,
        category: 'EXPERIENCE',
      },
    });
  }

  async findAll() {
    return await this.prismaService.record.findMany({
      where: {
        category: 'EXPERIENCE',
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

  async update(id: number, updateExperienceDto: UpdateExperienceDto) {
    return await this.prismaService.record.update({
      where: {
        id,
      },
      data: updateExperienceDto,
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
