import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginEvent } from '../EventSender/LoginEvent';

interface UserDetails
{
    cid:string;
    username:string;
    name:string;
    email:string;
    address:string;
    addharnumber:string;
    mdate:string;
    mobile:string;
    userimage:string;
    addharimage:string;
    ctime:string;
    dob:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

    userDetails:UserDetails={
        cid:"",
        username:"",
        name:"",
        email:"",
        address:"",
        addharnumber:"",
        mdate:"",
        mobile:"",
        userimage:"",
        addharimage:"",
        ctime:"",
        dob:""
    };

    showAImage=false;
    showUImage=false;

    isEditable=false;

  constructor(private router:Router,private http:HttpClient,private login:LoginEvent) { }

  cid:string="";
  showMessage=false;
  disMsg="";

  ngOnInit(): void {

    //Getting login details if not login then go to login page or else component will work
    this.cid=String(localStorage.getItem("id"));
    if(this.cid=="null")
    {
      //LOGIN SHOW
      this.router.navigate([""]);
    }
    else
    {
        this.http.post("https://workonits.co.in/OFFICE/getProfile.php",{cid:this.cid})
        .subscribe((response:UserDetails)=>{
            this.userDetails=response;
            if(this.userDetails.addharimage.includes(".jpg"))
            {
              this.userDetails.addharimage="https://workonits.co.in/OFFICE/addharimage/"+this.userDetails.addharimage;
              this.showAImage=true;
            }
            if(this.userDetails.userimage.includes(".jpg"))
            {
              this.userDetails.userimage="https://workonits.co.in/OFFICE/image/"+this.userDetails.userimage;
              this.showUImage=true;
            }
        });
    }
  }

  //When user will update data thet time this method will work
  onUpdateData(name:HTMLInputElement,address:HTMLTextAreaElement,number:HTMLInputElement)
  {
    if(name.value.length>0&&address.value.length&&number.value.length)
    {
        let mdate=String(new Date().getFullYear())+"/"+String(new Date().getMonth()+1)+"/"+String(new Date().getDate())+" "+String(new Date().getHours())+":"+String(new Date().getMinutes());
        this.http.post("https://workonits.co.in/OFFICE/updateUser.php",{cid:this.cid,mobile:number.value,address:address.value,name:name.value,date:mdate})
        .subscribe((response)=>
        {
            localStorage.setItem("username",name.value);
            this.login.subjectEvent.next();
            this.showMessage=true;
            this.disMsg="Updated";
            setTimeout(()=>{
                this.showMessage=false;
            },2000);
        });
    }
    else
    {
        this.showMessage=true;
        this.disMsg="Please Enter All Details";
        setTimeout(()=>{
            this.showMessage=false;
        },3000);
    }
  }


  //If we call this method then profile edit mode will open
  onEdit()
  {
    this.isEditable=true;
  }

  //If we call this method then profile edit mode will close
  onCancel()
  {
    this.isEditable=false;
  }
}