import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { Repository } from 'typeorm';
import { TrainingProps } from './types';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingService: Repository<Training>,
  ) {}

  async store(body: TrainingProps) {
    const { day, title } = body;

    const create = this.trainingService.create({
      day,
      title,
    });

    const training = await this.trainingService.save(create);

    return training;
  }

  async update(id: string, body: TrainingProps) {}

  async show(id: string) {
    const training = await this.trainingService.findOne({
      where: { id },
      relations: { workout: true },
    });

    return training;
  }

  async index() {
    const training = await this.trainingService.find({
      relations: { workout: true },
    });
    return training;
  }
}
