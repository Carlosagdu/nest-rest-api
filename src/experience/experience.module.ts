import { Module } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { ExperienceController } from './experience.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ExperienceController],
  providers: [ExperienceService, PrismaService],
})
export class ExperienceModule {}
