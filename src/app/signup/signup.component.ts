import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  dob="";
  password="";

  isEmail=false;
  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  //When user clicked on signup button this method will check all the details and then signup api will call

  onSignup(aimg:HTMLInputElement,img:HTMLInputElement)
  {
    let formData = new FormData();
    let cid = String(new Date().getDate())+String(new Date().getMonth())+String(new Date().getFullYear())+String(new Date().getHours())+String(new Date().getMinutes());

    if(this.username.length>0&&this.name.length>0&&this.email.length>0&&this.address.length>0&&this.anumber.length>0&&this.mobile.length==10&&aimg.files.length>0&&img.files.length>0&&this.dob.length>0&&this.password.length>0)
    {
      if(this.password.length>5)
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
            formData.append("dob",this.dob);
            formData.append("pass",this.password);
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
        this.showMessage=true;
        this.disMsg="Password should be greter than 5";
        setTimeout(()=>
        {
          this.showMessage=false;
        },2000);
      }
    }
    else
    {
      if(this.mobile.length!=10)
      {
        this.disMsg="Please enter proper mobile number";
      }
      else
      {
        this.disMsg="Please Enter All Data";
      }
      this.showMessage=true;
      setTimeout(()=>{
        this.showMessage=false;
      },3000);
    }
    
  }

  //It will check the enterd addhar number is number or char
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

  //It will check the enterd mobile number is number or char
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

  //It fetch the image from the file and set priview into the component
  getImage(img:HTMLInputElement,disp:HTMLImageElement)
  {
    if(!img.files[0].name.includes(".jpg"))
    {
      this.showMessage=true;
      this.disMsg="Please select jpg image";
      img.value="";
      setTimeout(()=>
      {
        this.showMessage=false;
      },2000);
    }
    else{
      disp.src=URL.createObjectURL(img.files[0]);
    }
    
  }

  //It checks the enterd data is mail or not
  checkEmail(event:Event)
  {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test((<HTMLInputElement>event.target).value))
    {
      this.isEmail=false;
    }
    else
    {
      this.isEmail=true;
    }
  }

  checkFileType(f:HTMLInputElement)
  {
    if(!f.files[0].name.includes(".jpg"))
    {
      this.showMessage=true;
      this.disMsg="Please select jpg image";
      f.value="";
      setTimeout(()=>
      {
        this.showMessage=false;
      },2000);
    }
  }

  checkDate(event:Event)
  {
    if(new Date((<HTMLInputElement>event.target).value).getTime()>=new Date().getTime())
    {
      this.showMessage=true;
      this.disMsg="Please enter valid DOB";
      setTimeout(()=>
      {
        this.showMessage=false;
      },2000);
    }
  }

}
