/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthBody } from './types';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userService: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(body: AuthBody) {
    const { email, password } = body;
    const user = await this.userService.findOne({ where: { email } });
    if (!user) {
      new HttpException(
        'usuário ou senhã não encontrados na base de dados',
        HttpStatus.NOT_FOUND,
      );
    }
    console.log(user?.password);
    const passIsVerify = await bcrypt.compare(password, user?.password);
    console.log(passIsVerify, 'ss');
    if (!passIsVerify) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    delete user?.password;
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
