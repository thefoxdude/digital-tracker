import { Component, AfterViewInit, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Goal } from './objects/goal';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/AuthenticationService.service';
import { DatabaseService } from './services/DatabaseService.service';
import { SharedService } from './services/SharedService.service';
import { ActivatedRoute } from '@angular/router';
import { GoalIncrement } from './objects/goalIncrement';



@Component({
   selector: 'goal-root',
   templateUrl: './goal.component.html',
   styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit, AfterViewInit {
   goal: Goal;
   goalId: string;
   newGoal: boolean;
   pos = { x: 0, y: 0};
   ctx: any;
   drawStarted: boolean = false;

   constructor(private sharedService: SharedService, private route: ActivatedRoute, private dbSerivce: DatabaseService) {
      this.goal = new Goal();
   }

   ngOnInit() {
      this.route.params.subscribe(params => {
         this.goalId = params['id'];
         if (this.goalId != 'new') {
            this.dbSerivce.getGoal(this.goalId).subscribe(result => {
               console.log(result.data())
               this.goal = result.data();
               this.newGoal = false;
               this.calculateGoal();
            });
         } else {
            this.newGoal = true;
         }
         console.log(this.goalId);
      });
   }

   ngAfterViewInit() {
   }

   calculateGoal() {
      this.goal.increments = [];
      for (let i = 0; i < this.goal.target; i += this.goal.increment) {
         let increment = new GoalIncrement;
         //TODO partial increment calculation
         increment.amount = this.goal.increment;
         if (i < this.goal.saved) {
            increment.completed = true;
         }
         this.goal.increments.push(increment);
         // console.log(i);
      }
   }

   setPosition(e: any) {
      this.pos.x = e.clientX;
      this.pos.y = e.clientY;
      console.log(this.pos.x + ' ' + this.pos.y);
   }

   startDraw(e: any, goalNum: number) {
      this.ctx = (<HTMLCanvasElement> document.getElementById("canvas" + goalNum)).getContext('2d');
      this.ctx.beginPath(); // begin
      this.ctx.lineWidth = 25;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = 'black';
      this.ctx.moveTo(e._x, e._y); // from
      this.drawStarted = true;
      // console.log(e._x + ' ' + e._y);
   }

   draw(e: any) {
      // let ctx = (<HTMLCanvasElement> document.getElementById("canvas")).getContext('2d');
      
      // this.setPosition(e);
      //TODO: Handle partial fills (maybe reset if drawing was small?)
      if (this.drawStarted) {
         this.ctx.lineTo(e._x, e._y); // to
    
         this.ctx.stroke(); // draw it!
         // console.log("made it");
         // console.log(e._x + ' ' + e._y);
      }
   }

   finishDraw(e: any) {
      if (this.drawStarted) {
         this.draw(e);
         this.drawStarted = false;
         this.goal.saved += this.goal.increment;
         this.calculateGoal();
      }
   }

   ev_canvas (ev: any, goalNum: number) {
      ev.preventDefault();
      // Firefox
      if (ev.layerX || ev.layerX == 0) {
         ev._x = ev.layerX;
         ev._y = ev.layerY;
      // Opera
      } else if (ev.offsetX || ev.offsetX == 0) {
         ev._x = ev.offsetX;
         ev._y = ev.offsetY;
      }
   
      // Call the event handler of the tool
      let func = ev.type;
      // console.log(func);
      if (func == 'mousedown') {
         this.startDraw(ev, goalNum);
      } else if (func == 'mousemove') {
         this.draw(ev);
      } else if (func == 'mouseup') {
         this.finishDraw(ev);
      }

      //TODO: Allow for touch
   }
}
