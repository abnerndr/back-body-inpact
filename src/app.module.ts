/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { join } from 'path';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { WorkoutModule } from './api/workout/workout.module';
import { TrainingModule } from './api/training/training.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TrainingModule,
    WorkoutModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
  ],
})
export class AppModule {}
