import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './workout.entity';
import { WorkoutController } from './workout.controller';
import { WorkoutService } from './workout.service';
import { Training } from '../training/training.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, Training])],
  providers: [WorkoutService],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
