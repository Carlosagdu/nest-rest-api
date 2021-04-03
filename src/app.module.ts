import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { AuthModule } from './auth/auth.module';
import { FacebookStrategy } from './auth/strategies/facebook.strategy';

@Module({
  imports: [PostsModule, ExperienceModule, EducationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy],
})
export class AppModule {}
