import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { AuthModule } from './auth/auth.module';
import { FacebookStrategy } from './auth/strategies/facebook.strategy';
import { TwitterStrategy } from './auth/strategies/twitter.strategy';
import { MulterModule } from '@nestjs/platform-express';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PostsModule,
    ExperienceModule,
    EducationModule,
    AuthModule,
    MulterModule.register({ dest: './pictures' }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, FacebookStrategy, TwitterStrategy],
})
export class AppModule {}
