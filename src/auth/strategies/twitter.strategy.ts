import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import {
  Strategy,
  Profile,
  IStrategyOptionWithRequest,
} from 'passport-twitter';

const twitterOption: IStrategyOptionWithRequest = {
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  callbackURL: 'http://localhost:3000/auth/twitter/success',
  passReqToCallback: true,
  skipExtendedUserProfile: false,
};

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor() {
    super(twitterOption);
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any) => void,
  ): Promise<any> {
    const { username, id, displayName } = profile;
    const user = {
      id,
      username,
      displayName,
    };
    const payload = {
      user,
      accessToken,
    };
    done(null, payload);
  }
}
