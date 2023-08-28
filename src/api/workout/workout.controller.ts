import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutProps } from './types';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Post('create/:training_id')
  async createWorkout(
    @Param('training_id') trainingId: string,
    @Body() body: WorkoutProps,
  ) {
    return await this.workoutService.store(body, trainingId);
  }

  @Put('update/:workout_id/training/:training_id')
  async updateWorkout(
    @Param('workout_id') workoutId,
    @Param('training_id') trainingId,
    @Body() body: WorkoutProps,
  ) {
    return await this.workoutService.update(workoutId, body, trainingId);
  }

  @Get('show/:workout_id')
  async showWorkout(@Param('workout_id') workoutId) {
    return await this.workoutService.show(workoutId);
  }

  @Get('list-all')
  async listWorkouts() {
    return await this.workoutService.index();
  }
}
