import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from "src/environments/environment";
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './services/AuthenticationService.service';
import { DatabaseService } from './services/DatabaseService.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MultilineDotdotdotModule } from 'multiline-dotdotdot';
import { GoalComponent } from './goal.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home.component';
import { SharedService } from './services/SharedService.service';


@NgModule({
   declarations: [
      AppComponent,
      GoalComponent,
      HomeComponent
   ],
   imports: [
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      FormsModule,
      AngularFireAuthModule,
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
      MultilineDotdotdotModule,
      AppRoutingModule
   ],
   providers: [
      AuthenticationService,
      DatabaseService,
      SharedService
   ],
   bootstrap: [AppComponent]
})
export class AppModule { }
