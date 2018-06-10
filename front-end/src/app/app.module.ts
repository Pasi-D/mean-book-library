import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/user_components/register/register.component';
import { LoginComponent } from './components/user_components/login/login.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule
  ],
  providers: [ValidateService,FlashMessagesService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
