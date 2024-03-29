import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addroom',
  templateUrl: './addroom.component.html',
  styleUrls: ['./addroom.component.css']
})
export class AddroomComponent implements OnInit {


  roomNumber="";
  bed="";
  flored="";
  details="";
  imageLink="";
  price="";
  showMessage=false;
  disMsg="";

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onSaveButton()
  {
    console.log(this.flored.length);
    if(this.roomNumber.length>0&&this.bed.length>0&&this.flored.length>0&&this.details.length>0&&this.imageLink.length>0&&this.price.length>0)
    {
      this.http.post("https://workonits.co.in/OFFICE/addProduct.php",{room:this.roomNumber,bed:this.bed,flore:this.flored,det:this.details,image:this.imageLink,price:this.price})
      .subscribe((res)=>{
        this.roomNumber="";
        this.bed="";
        this.flored="";
        this.details="";
        this.imageLink="";
        this.price="";
        this.showMessage=true;
        this.disMsg="Done";
        setTimeout(()=>
        {
          this.showMessage=false;
        },2000);
      });
    }
    else
    {
      this.showMessage=true;
      this.disMsg="Please enter all details";
      setTimeout(()=>
      {
        this.showMessage=false;
      },2000);
    }
  }
}
