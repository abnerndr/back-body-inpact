import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { Repository } from 'typeorm';
import { WorkoutProps } from './types';
import { Training } from '../training/training.entity';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutService: Repository<Workout>,
    @InjectRepository(Training)
    private readonly trainingService: Repository<Training>,
  ) {}

  async store(body: WorkoutProps, trainingId: string) {
    const training = await this.trainingService.findOne({
      where: { id: trainingId },
    });

    body.training = training;

    const workout = await this.workoutService.save(body);

    return workout;
  }

  async update(id: string, body: WorkoutProps, trainingId: string) {
    const { name, description, image, machine_number } = body;

    const oldWorkout = await this.workoutService.findOne({ where: { id } });

    if (!oldWorkout) {
      new HttpException('exercicio não encontrado', HttpStatus.NOT_FOUND);
    }

    const training = await this.trainingService.findOne({
      where: { id: trainingId },
    });

    if (!training) {
      new HttpException('treino não encontrado', HttpStatus.NOT_FOUND);
    }

    const create = this.workoutService.create({
      name,
      description,
      image,
      machine_number: machine_number || 0,
      training: trainingId ? training : oldWorkout?.training,
    });

    const update = await this.workoutService.update(id, create);

    if (!update) {
      new HttpException(
        'não foi possivél atualizar o treino',
        HttpStatus.BAD_REQUEST,
      );
    }

    const workout = await this.workoutService.findOne({
      where: { id },
      relations: { training: true },
    });

    return workout;
  }

  async show(id: string) {
    const workout = await this.workoutService.findOne({
      where: { id },
      select: { training: { id: true, bid: true, day: true, title: true } },
      relations: { training: true },
    });

    return workout;
  }

  async index() {
    const workout = await this.workoutService.find({
      select: { training: { id: true, bid: true, day: true, title: true } },
      relations: { training: true },
    });

    return workout;
  }
}
