import { Component, OnInit } from '@angular/core';
import { AdminCheck } from '../EventSender/adminEvent';
import { LogOutEvent } from '../EventSender/LogoutEvent';

@Component({
  selector: 'app-navigationstyle',
  templateUrl: './navigationstyle.component.html',
  styleUrls: ['./navigationstyle.component.css']
})
export class NavigationstyleComponent implements OnInit {

  constructor(private adminEvent:AdminCheck,private logoutEvent:LogOutEvent,private logout:LogOutEvent) { }

  isAdmin=false;
  isShowNavigation=false;
  logMessage="";
  ngOnInit(): void {
    let role=String(localStorage.getItem("role"));
    let id=String(localStorage.getItem("id"));
    if(id=="null")
    {
      //LOGIN SHOW
      this.logMessage="Login";
    }
    else{
      this.logMessage="Logout";
      this.isShowNavigation=true;
    }
    if(role=="null"||role!="admin")
    {
      //DON'T SHOW ORDERS
      this.isAdmin=false;
    }
    else{
      //SHOW ORDERS
      this.isAdmin=true;
    }
    this.adminEvent.subjectEvent.subscribe((data)=>{
      if(data)
      {
        this.isAdmin=true;
      }
      this.logMessage="Logout";
      this.isShowNavigation=true;
    });

    this.logoutEvent.subjectEvent.subscribe(()=>{
      this.logMessage="Login";
      this.isAdmin=false;
      this.isShowNavigation=false;
    });
  }

}
