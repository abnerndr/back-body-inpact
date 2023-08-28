import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { Workout } from '../workout/workout.entity';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Training, Workout])],
  providers: [TrainingService],
  controllers: [TrainingController],
})
export class TrainingModule {}
