import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/public_api';
import { Observable } from 'rxjs';
import { Goal } from '../objects/goal';
import { User } from '../objects/user';

@Injectable({
   providedIn: 'root'
})
export class DatabaseService {
   collection: AngularFirestoreCollection<Goal>;
   objects$: Observable<Goal[]>;
   object$: Observable<Goal>;
   collectionUsers: AngularFirestoreCollection<User>;
   objectsUsers$: Observable<User[]>;
   goals: Goal[];

   constructor(private db: AngularFirestore) { }


   getGoals(userId: string): Observable<Goal[]> {
      console.log(userId);
      this.collection = this.db.collection("goals", goals => goals.where('userId', '==', userId));
      this.objects$ = this.collection.valueChanges({idField: 'id'});
      return this.objects$;
   }

   getGoal(goalId: string): any {
      // this.collection = this.db.collection("goals", goals =
      
      return this.db.collection("goals").doc(goalId).get();
   }

   getUser(userId: string): Observable<User[]> {
      console.log(userId);
      this.collectionUsers = this.db.collection("users", user => user.where('userID', '==', userId));
      this.objectsUsers$ = this.collectionUsers.valueChanges();
      return this.objectsUsers$;
   }

   async updateGoal(goal: Goal) {
      console.log('updated');
      this.db.collection('goals').doc(goal.id).set({
         category: goal.category,
         completed: goal.completed,
         icon: goal.icon,
         increment: goal.increment,
         name: goal.name,
         saved: goal.saved,
         target: goal.target
      }, {merge: true});
   }

   async saveNewGoal(goal: Goal) {
      let result = await this.db.collection('goals').add({
      });
      console.log('Added document with ID: ', result.id);
   }

   async saveNewUser(userID: string, username: string) {
      let result = await this.db.collection('users').add({
         userID: userID,
         username: username
      });
      console.log('Added user with username: ', result.id);
   }
   
}
