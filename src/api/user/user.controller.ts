/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserBody } from './types';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async createUser(@Body() body: UserBody) {
    return this.userService.store(body);
  }

  @UseGuards(AuthGuard)
  @Get('all')
  async listUsers() {
    return this.userService.list();
  }
}
