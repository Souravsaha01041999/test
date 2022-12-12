
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LogOutEvent } from '../EventSender/LogoutEvent';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private logouEvent:LogOutEvent,private route:Router) { }

  ngOnInit(): void {
    localStorage.clear();
    setTimeout(()=>{
      localStorage.clear();
      this.logouEvent.subjectEvent.next();
      this.route.navigate(["login"]);
    },1000);
  }

}
