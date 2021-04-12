import { Component, AfterViewInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Goal } from './objects/goal';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/AuthenticationService.service';
import { DatabaseService } from './services/DatabaseService.service';



@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
   title = 'digital-tracker';
   goals: Goal[];
   collection: AngularFirestoreCollection<Goal>;
   objects$: Observable<Goal[]>;
   email: string;
   password: string;
   userId: string;
   username: string;
   signingUp: boolean;
   xDown = null;
   yDown = null;
   showCompleted: boolean;
   touchStartCompleted: boolean;
   buildNo: number;
   item: any;
   timerID: any;
   counter: any;
   errorMessages: string[];

   pressHoldEvent: any;
   pressHoldDuration: any;
   
   

   constructor(private db: AngularFirestore, 
               private authenticationService: AuthenticationService,
               private dbService: DatabaseService) {
      this.showCompleted = true;
      this.signingUp = false;
      if (this.authenticationService.isLoggedIn()) {
         let user = JSON.parse(localStorage.getItem('user'));
         // console.log(user);
         this.userId = user.uid;
         this.getUsername(this.userId);
         this.username = user.username;
         this.getGoals();
      } else {
         this.userId = null;
      }
      this.buildNo = 1;
      this.errorMessages = [];
   }

   ngAfterViewInit() {
      if (this.userId == null) {
         (<HTMLElement> document.getElementById("loginModal")).style.display = 'block';
      }
   }

   getUsername(userId: string) {
      this.dbService.getUser(userId).subscribe(username => {
         console.log("Username object: " + username);
         if (username.length > 0) {
            this.username = username[0].username;
         }
      });
   }

   signUp() {
      this.authenticationService.SignUp(this.email, this.password, this.username).then(userId => {
         this.userId = <string> userId;
         this.getUsername(this.userId);
      }, error => {
         console.log("We didn't make it: ", error);
      });
   }
      
   signIn() {
      this.authenticationService.SignIn(this.email, this.password).then(userId => {
         this.userId = <string> userId;
         this.getUsername(this.userId);
         this.getGoals();
      }, error => {
         this.showError(error);
         console.log("We didn't make it: ", error);
      });
   }

   showError(error: Error) {
      let email = <HTMLInputElement> document.getElementById('email');
      let password = <HTMLInputElement> document.getElementById('password');
      if (this.email == null || this.password == null) {
         this.flashItem(email);
         this.errorMessages.push('Email is required\n');
         if (this.password == null) {
            this.flashItem(password);
            this.errorMessages.push('Password is required\n');
         }
      } else {
         if (error.toString().includes('email')) {
            this.flashItem(email);
            this.errorMessages.push('Email is incorrect\n');
         } else if (error.toString().includes('password')) {
            this.flashItem(password);
            this.errorMessages.push('Password is incorrect\n');
         }
      }
   }
      
   signOut() {
      this.authenticationService.SignOut();
   }

   showSignUp() {
      this.signingUp = !this.signingUp;
   }

   getGoals() {
      this.objects$ = this.dbService.getGoals(this.userId);
      this.objects$.subscribe(goals => {
         // console.log(tasks);
         this.goals = goals;
         console.log(this.goals);
      });
   }

   selectGoal(goalId: string) {
      console.log(goalId);
      let goal = this.goals.find(x => x.id == goalId);
   }

   stopBubble(event: Event) {
      event.stopPropagation();
   }

   openModal(modalName: string) {
      (<HTMLElement> document.getElementById(modalName)).style.display = 'block';
   }

   closeModal(modalName: string) {
      (<HTMLElement> document.getElementById(modalName)).style.display = 'none';
   }

   logout() {
      console.log("logout");
      this.authenticationService.SignOut();
      this.goals = [];
      this.userId = null;
   }

   async flashItem(item: HTMLInputElement) {
      item.className = 'w3-input w3-border w3-margin-bottom';
      setTimeout(function() {
         item.className += ' fox-flash-red';
      }, 1);
      await this.delay(2000);
      this.errorMessages = [];
   }

   async delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
   }
}
