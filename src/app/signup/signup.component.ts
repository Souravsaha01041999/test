import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestScheduler } from 'rxjs/testing';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  disMsg="";
  showMessage=false;

  username="";
  name="";
  email="";
  address="";
  anumber="";
  mobile="";

  constructor(private router:Router) { }

  ngOnInit(): void {
    
  }

  onSignup(aimg:HTMLInputElement,img:HTMLInputElement)
  {
    let formData = new FormData();
    let cid = String(new Date().getDate())+String(new Date().getMonth())+String(new Date().getFullYear())+String(new Date().getHours())+String(new Date().getMinutes());

    if(this.username.length>0&&this.name.length>0&&this.email.length>0&&this.address.length>0&&this.anumber.length>0&&this.mobile.length>0&&aimg.files.length>0&&img.files.length>0)
    {
      if(aimg.files[0].size<=2097152&&img.files[0].size<=2097152&&aimg.files[0].name.includes(".jpg")&&img.files[0].name.includes(".jpg"))
      {
        //UPLOADING CODE
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
        {
          //UPLOAD DATA
          formData.append("cid",cid);
          formData.append("username",this.username);
          formData.append("name",this.name);
          formData.append("email",this.email);
          formData.append("address",this.address);
          formData.append("addharnumber",this.anumber);
          formData.append("mobile",this.mobile);
          formData.append("ctime",String(new Date().getFullYear())+"/"+String(new Date().getMonth()+1)+"/"+String(new Date().getDate())+" "+String(new Date().getHours())+":"+String(new Date().getMinutes()));

          formData.append("addhar", aimg.files[0]);
          formData.append("image", img.files[0]);
          fetch('https://workonits.co.in/OFFICE/signup.php', {
              method: "POST",
              body: formData
          })
          .then((response) => response.text())
          .then((response)=>{
            switch(response)
            {
              case "Done":
                this.disMsg="Done";
                this.showMessage=true;
                setTimeout(()=>{
                  this.showMessage=false;
                  this.router.navigate(["login"]);
                },3000);
              break;
              case "ex":
                this.disMsg="Email Already exist";
                this.showMessage=true;
                setTimeout(()=>{
                  this.showMessage=false;
                },3000);
              break;
            }
          });
        }
        else{
          this.showMessage=true;
          this.disMsg="Please Enter Email";
          setTimeout(()=>{
            this.showMessage=false;
          },3000);
        }
      }
      else
      {
        this.showMessage=true;
        this.disMsg="Please select image that is less than 2MB and select jpg file only";
        setTimeout(()=>
        {
          this.showMessage=false;
        },2000);
      }
    }
    else
    {
      this.disMsg="Please Enter All Data";
      this.showMessage=true;
      setTimeout(()=>{
        this.showMessage=false;
      },3000);
    }
    
  }

  onAddharInput()
  {
    if(!this.anumber.match(/^[0-9]+$/))
    {
      
      this.disMsg="Please Enter Addhar Number";
      this.showMessage=true;
      setTimeout(()=>
      {
        this.anumber="";
        this.showMessage=false;
      },3000);
    }
  }

  onMobileInput()
  {
    if(!this.mobile.match(/^[0-9]+$/))
    {
      
      this.disMsg="Please Enter Mobile Number";
      this.showMessage=true;
      setTimeout(()=>
      {
        this.mobile="";
        this.showMessage=false;
      },3000);
    }
  }

  getImage(img:HTMLInputElement,disp:HTMLImageElement)
  {
    disp.src=URL.createObjectURL(img.files[0]);
    console.log(img.files[0].name);
  }

}
