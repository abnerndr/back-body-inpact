import { WorkoutProps } from '../workout/types';

export type TrainingProps = {
  id?: string;
  bid?: number;
  day:
    | 'sunday'
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturnday';
  title: string;
  workout?: WorkoutProps[];
  creat_at?: Date;
  update_at?: Date;
};
