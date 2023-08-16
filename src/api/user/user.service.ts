/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserBody } from './types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userService: Repository<User>) {}

  async store(body: UserBody) {
    const emailExists = await this.userService.findOne({
      where: { email: body.email },
    });

    if (emailExists) {
      throw new HttpException(
        'usuário existente na base de dados',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(body.password, 10);
    const createUserObj = this.userService.create({
      name: body.name,
      email: body.email,
      password: hash,
      birthdate: body.birthdate,
    });
    const user = await this.userService.save(createUserObj);

    const { password, ...rest } = user;
    return rest;
  }

  async list() {
    const users = await this.userService.find();
    users.filter((user) => delete user.password);
    return users;
  }
}
