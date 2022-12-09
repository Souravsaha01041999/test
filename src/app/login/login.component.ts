import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminCheck } from '../EventSender/adminEvent';
import { LoginEvent } from '../EventSender/LoginEvent';
import { LogOutEvent } from '../EventSender/LogoutEvent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http:HttpClient,private adminEvent:AdminCheck,private logoutEvent:LogOutEvent,private router:Router,private login:LoginEvent) { }
  isLogin=false;
  email="";
  disMsg="";
  isActive=true;
  showMessage=false;

  cross=false;
  tick=false;
  showSendOTP=false;

  ngOnInit(): void {
    //Checking already loged in or not
    this.loadSystem();
  }

  loadSystem()
  {
    let id=String(localStorage.getItem("id"));
    if(id=="null")
    {
      //LOGIN SHOW
      this.isLogin=false;
    }
    else{
      //SHOW ALREADY LODIN
      this.isLogin=true;
      setTimeout(()=>{
        localStorage.clear();
        this.isLogin=false;
        this.logoutEvent.subjectEvent.next();
      },1000);
    }
  }

  //Here clled to the login api
  onLogin(pass:HTMLInputElement){
    //AFTER GETTING SUCCESS RESPONSE ID (NOT EMAIL ID IT IS CID) AND ROLE WILL STORE IN LOCALSTORAGE
    console.log(this.email);
    if(pass.value.length>0&&this.email.length>0)
    {
      this.showMessage=true;
      this.disMsg="Please Wait...";
      this.http.post("https://workonits.co.in/OFFICE/login.php",{email:this.email,pass:pass.value})
      .subscribe((respone)=>{
        this.showMessage=false;

        switch(respone["user"])
        {
          case "not found":   //User not in server database
              this.disMsg="User Not Found";
              this.showMessage=true;
              setTimeout(()=>{
                this.showMessage=false;
              },3000);
            break;
          case "password":    //Password error
              this.disMsg="Please enter right password";
              this.showMessage=true;
              setTimeout(()=>{
                this.showMessage=false;
              },3000);
            break;
          default:    //Everything is fine then login successfully
              localStorage.setItem("id",respone["user"]);
              localStorage.setItem("role",respone["role"]);
              localStorage.setItem("username",respone["username"]);

              if(respone["role"]=="admin")
              {
                this.adminEvent.subjectEvent.next(true);
              }
              else{
                this.adminEvent.subjectEvent.next(false);
              }
              this.isLogin=!this.isLogin;
              this.login.subjectEvent.next();
              this.router.navigate([""]);
        }
      });
    }
    else
    {
      this.disMsg="Please enter all details";
      this.showMessage=true;
      setTimeout(()=>{
        this.showMessage=false;
      },3000);
    }
  }

  //When email is inputing that time check the enterd email is exist or not in server database
  onInputEmail(email:HTMLInputElement)
  {
    this.email=email.value;
    if(email.value.length>0&&(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)))
    {
      //SEND HTTP REQUEST AFTER GETTING RESPONSE CHECK THE EMAIL EXIST OT NOT IF EXIST THEN SHOW TICK AND SEND OTP ELSE SHOW CROSS
      this.http.post("https://workonits.co.in/OFFICE/checkEmail.php",{email:email.value},
      {
        responseType:'text'
      }).subscribe((response)=>{
        if(response=="1")
        {
          this.tick=true;
          this.showSendOTP=true;
          this.cross=false;
        }
        else
        {
          this.tick=false;
          this.showSendOTP=false;
          this.cross=true;
        }
      });
    }
    else
    {
      this.tick=false;
      this.showSendOTP=false;
      this.cross=false;
    }
  }

}