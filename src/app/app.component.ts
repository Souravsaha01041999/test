import { Component, OnInit } from '@angular/core';
import { LoginEvent } from './EventSender/LoginEvent';
import { LogOutEvent } from './EventSender/LogoutEvent';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HOTEL_BOOKING_PROJECT';
  user="";

  constructor(private login:LoginEvent,private logout:LogOutEvent){}

  ngOnInit(): void {
    this.loadSystem();
  }
  
  //This method used for to get user name from local storage and it will print on navigation
  loadSystem()
  {
    let userShow=String(localStorage.getItem("username"));
    if(userShow!="null")
    {
      this.user=userShow;
    }
    this.login.subjectEvent.subscribe(()=>
    {
      this.user=String(localStorage.getItem("username"));
    });
    this.logout.subjectEvent.subscribe(()=>{
      this.user="";
    });
  }
}
