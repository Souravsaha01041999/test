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

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

const myRouts:Routes=[
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'rooms',component:RoomsComponent},
  {path:'cart',component:CartComponent},
  {path:'signup',component:SignupComponent},
  {path:'allorders',component:AllordersComponent},
  {path:'roomdetails/:roomnumber',component:RoomdetailsComponent},
  {path:'cdetails/:bid',component:CustomerdetailsComponent},
  {path:'profile',component:MyprofileComponent},
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
    FormsModule
  ],
  providers: [
    AdminCheck,LogOutEvent,LoginEvent],
  bootstrap: [AppComponent]
})
export class AppModule { }