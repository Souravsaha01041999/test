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
  flore="";
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
    this.http.post("https://workonits.co.in/OFFICE/addProduct.php",{room:this.roomNumber,bed:this.bed,flore:this.flore,det:this.details,image:this.imageLink,price:this.price})
    .subscribe((res)=>{
      this.roomNumber="";
      this.bed="";
      this.flore="";
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
}
