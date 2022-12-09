import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigationstyleComponent } from './navigationstyle/navigationstyle.component';
import { HomeComponent } from './home/home.component';
import { Routes,RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { MessageComponent } from './message/message.component';
import { AdminCheck } from './EventSender/adminEvent';
import { LogOutEvent } from './EventSender/LogoutEvent';
import { AllordersComponent } from './allorders/allorders.component';
import { ShortWritting } from './MyPipe/ShortWritting';
import { RoomdetailsComponent } from './roomdetails/roomdetails.component';
import { FormsModule } from '@angular/forms';
import { CustomerdetailsComponent } from './customerdetails/customerdetails.component';
import { LoginEvent } from './EventSender/LoginEvent';

import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { NotFoundComponent } from './not-found/not-found.component';

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { HomeAuth } from './AuthenticationService/HomeAuth';
import { AllOrderAuth } from './AuthenticationService/AllOrderAuth';
import { CartAuth } from './AuthenticationService/CartAuth';
import { CustomerDetailsAuth } from './AuthenticationService/CustomerDetailsAuth';
import { MyProfileAuth } from './AuthenticationService/MyProfileAuth';
import { RoomDetailsAuth } from './AuthenticationService/RoomDetailsAuth';
import { RoomAuth } from './AuthenticationService/RoomAuth';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

const myRouts:Routes=[
  {path:'',component:HomeComponent,canActivate:[HomeAuth]},
  {path:'login',component:LoginComponent},
  {path:'rooms',component:RoomsComponent,canActivate:[RoomAuth]},
  {path:'cart',component:CartComponent,canActivate:[CartAuth]},
  {path:'signup',component:SignupComponent},
  {path:'allorders',component:AllordersComponent,canActivate:[AllOrderAuth]},
  {path:'roomdetails',component:RoomdetailsComponent,canActivate:[RoomDetailsAuth]},
  {path:'cdetails/:bid',component:CustomerdetailsComponent,canActivate:[CustomerDetailsAuth]},
  {path:'profile',component:MyprofileComponent,canActivate:[MyProfileAuth]},
  {path:'**',component:NotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationstyleComponent,
    HomeComponent,
    LoginComponent,
    RoomsComponent,
    CartComponent,
    SignupComponent,
    MessageComponent,
    AllordersComponent,
    ShortWritting,
    RoomdetailsComponent,
    CustomerdetailsComponent,
    CanvasJSChart,
    MyprofileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(myRouts),
    HttpClientModule,
    FormsModule,
    ButtonModule,
    TableModule
  ],
  providers: [AdminCheck,LogOutEvent,LoginEvent,HomeAuth,AllOrderAuth,CartAuth,CustomerDetailsAuth,MyProfileAuth,RoomDetailsAuth,RoomAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }