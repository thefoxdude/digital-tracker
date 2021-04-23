import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalComponent } from './goal.component';
import { HomeComponent } from './home.component';
import { NewGoalComponent } from './new-goal.component';

const routes: Routes = [
   { path: 'goal/:id', component: GoalComponent},
   { path: '', component: HomeComponent },
   { path: 'new-goal', component: NewGoalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
