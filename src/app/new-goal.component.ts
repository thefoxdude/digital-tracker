import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Goal, GoalCategories, Icon } from './objects/goal';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/AuthenticationService.service';
import { DatabaseService } from './services/DatabaseService.service';
import { SharedService } from './services/SharedService.service';
import { ActivatedRoute, Router } from '@angular/router';
import icons from './objects/icons.json';


@Component({
   selector: 'new-goal-root',
   templateUrl: './new-goal.component.html',
   styleUrls: ['./new-goal.component.css']
})
export class NewGoalComponent {
   goal: Goal;
   categories: GoalCategories;
   icons: Icon[];

   constructor(private sharedService: SharedService, private route: ActivatedRoute, private dbSerivce: DatabaseService, private router: Router) {
      this.goal = new Goal();
      this.icons = icons;
   }

   goHome() {
      console.log("here");
      this.router.navigate(['/']);
   }

   saveToDatabase() {

   }
}
