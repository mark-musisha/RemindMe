import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validateHash } from 'src/common/utils';

import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { UserLoginDto } from './dtos/user-login.dto';

import { google, Auth } from 'googleapis';
import * as config from 'config';

const googleConfig = config.get('google');

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;
  logger = new Logger('AuthService');
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {
    this.oauthClient = new google.auth.OAuth2(
      googleConfig.client_id,
      googleConfig.client_secret,
    );
  }

  async createAccessToken(user: Partial<UserEntity>): Promise<string> {
    return this.jwtService.signAsync({
      id: user.id,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      role: user.role,
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });

    const isPasswordValid = await validateHash(
      userLoginDto.password,
      user?.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user!;
  }

  facebookLogin(req) {
    if (!req.user) {
      return 'No user from facebook';
    }

    return {
      message: 'User information from facebook',
      user: req.user,
    };
  }
}
