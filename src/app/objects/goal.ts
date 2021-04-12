import { GoalIncrement } from './goalIncrement';

export class Goal {
   name: string;
   userId: string;
   category: string;
   id: string;
   target: number;
   increment: number;
   createdDate: any;
   icon: string;
   saved: number;
   completed: boolean;
   increments: GoalIncrement[];
}