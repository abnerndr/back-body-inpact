import { TrainingProps } from '../training/types';

export type WorkoutProps = {
  id?: string;
  bid?: number;
  name: string;
  description: string;
  image: string;
  machine_number: number;
  training?: TrainingProps;
  creat_at?: Date;
  update_at?: Date;
};
