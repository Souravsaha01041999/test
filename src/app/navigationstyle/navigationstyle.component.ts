import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCheck } from '../EventSender/adminEvent';
import { LogOutEvent } from '../EventSender/LogoutEvent';

@Component({
  selector: 'app-navigationstyle',
  templateUrl: './navigationstyle.component.html',
  styleUrls: ['./navigationstyle.component.css']
})
export class NavigationstyleComponent implements OnInit {

  constructor(private adminEvent:AdminCheck,private logoutEvent:LogOutEvent,private logout:LogOutEvent,private router:Router) { }

  isAdmin=false;
  isShowNavigation=false;
  logMessage="";
  ngOnInit(): void {
    //Here we are checkin user login details and if logedin then it will display in navigation bar
    this.loadSystem();
  }

  loadSystem()
  {
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

  setLoginLogout(){
    if(this.logMessage=="Logout")
    {
      this.router.navigate(["logout"]);
    }
    else
    {
      this.router.navigate(["login"]);
    }
  }

}
