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
  otp="";
  email="";
  disMsg="";
  isActive=true;
  showMessage=false;

  cross=false;
  tick=false;
  showSendOTP=false;

  ngOnInit(): void {
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

  sendOTP(emailVal:HTMLInputElement)
  {
    if(emailVal.value.length>0&&(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailVal.value)))
    {
      this.otp=String(Math.ceil(Math.random()*9))+String(Math.ceil(Math.random()*9))+String(Math.ceil(Math.random()*9))+String(Math.ceil(Math.random()*9));
      this.email=emailVal.value;

      this.disMsg="OTP sending";
      this.showMessage=true;

      console.log(this.otp);

      this.http.post("https://workonits.co.in/OFFICE/sendOTP.php",{email:emailVal.value,otp:this.otp},
      {responseType:'text'})
      .subscribe((response)=>{
        if(response=="1")
        {
          this.disMsg="Please check OTP";
          this.isActive=false;
          console.log(this.otp);
        }
        else
        {
          this.disMsg="User not found";
          this.isActive=true;
        }

        setTimeout(()=>{
          this.showMessage=false;
        },3000);
      });
    }
    else
    {
      this.showMessage=true;
      this.disMsg="Please enter email";
      setTimeout(()=>{
        this.showMessage=false;
      },3000);
    }
  }

  onLogin(otpval:HTMLInputElement){
    //AFTER GETTING SUCCESS RESPONSE ID (NOT EMAIL ID IT IS CID) AND ROLE WILL STORE IN LOCALSTORAGE
    if(this.otp==otpval.value&&this.email.length>0)
    {
      this.showMessage=true;
      this.disMsg="Please Wait...";
      this.http.post("https://workonits.co.in/OFFICE/login.php",{email:this.email})
      .subscribe((respone)=>{
        this.showMessage=false;
        if(respone["user"]!="not found")
        {
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
        else{
          this.disMsg="User Not Found";
          this.showMessage=true;
          setTimeout(()=>{
            this.showMessage=false;
          },3000);
        }
      });
    }
    else{
      this.disMsg="Login Details incorrect";
      this.showMessage=true;
      setTimeout(()=>{
        this.showMessage=false;
      },3000);
    }
  }

  onInputEmail(email:HTMLInputElement)
  {
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