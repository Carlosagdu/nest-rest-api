import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { AboutModule } from './about/about.module';

@Module({
  imports: [PostsModule, ExperienceModule, EducationModule, AboutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
