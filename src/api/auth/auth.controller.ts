import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBody } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthBody) {
    return await this.authService.signIn(body);
  }
}
