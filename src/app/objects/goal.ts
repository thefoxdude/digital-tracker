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

export enum GoalCategories {
   Vacation = "Vacation",
   Debt = "Debt",
   Sinking_Fund = 'Sinking Fund'
}

export class Icon {
   name: string;
   url: string;
}