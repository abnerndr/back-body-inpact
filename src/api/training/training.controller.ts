import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingProps } from './types';

@Controller('training')
export class TrainingController {
  constructor(private trainingService: TrainingService) {}

  @Post('create')
  async creatTraining(@Body() body: TrainingProps) {
    return await this.trainingService.store(body);
  }

  @Put('update/:training_id')
  async updateTraining(
    @Param('training_id') traningId,
    @Body() body: TrainingProps,
  ) {
    return await this.trainingService.update(traningId, body);
  }

  @Get('show/:training_id')
  async showTraining(@Param('training_id') traningId) {
    return await this.trainingService.show(traningId);
  }

  @Get('list-all')
  async listTrainings() {
    return await this.trainingService.index();
  }
}
