import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { Goal } from '../objects/goal';
import { User } from '../objects/user';

@Injectable({
   providedIn: 'root'
})
export class SharedService {
   selectedGoal: Goal;

   setSelectedGoal(goal: Goal) {
      this.selectedGoal = goal;
   }

   getSelectedGoal(): Goal {
      return this.selectedGoal;
   }
}