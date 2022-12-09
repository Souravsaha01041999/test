import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-roomdetails',
  templateUrl: './roomdetails.component.html',
  styleUrls: ['./roomdetails.component.css']
})
export class RoomdetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private http:HttpClient,private router:Router) { }

  roomnumber="";
  bed="";
  flr="";
  det="";
  img="";
  price="";
  isImageShow=false;

  isVisable=false;

  showMessage=false;
  disMsg="";

  showEdit=false;


  ngOnInit(): void {
    this.systemLoad();
  }

  systemLoad()
  {
    let room=this.route.snapshot.queryParams['roomnumber'];

    if(String(localStorage.getItem("role"))=="admin")
    {
      this.showEdit=true;
    }

    this.http.get("https://workonits.co.in/OFFICE/getRoomDetails.php?room="+room)
    .subscribe((response)=>{
      this.roomnumber=response["hotel_name"];
      this.bed=response["bed"];
      this.flr=response["location"];
      this.det=response["details"];
      this.img=response["image"];
      this.price=response["price"];
      if(this.roomnumber.length>0)
      {
        this.isVisable=true;
      }
    });
  }

  //If image zoom in
  onClickImage()
  {
    this.isImageShow=true;
  }

  //If image zoom out
  onClickCloseImage()
  {
    this.isImageShow=false;
  }

  //If admin will call save button then only all details will save in to the server
  onSave()
  {
    this.http.post("https://workonits.co.in/OFFICE/updateRoom.php",{room:this.roomnumber,price:this.price,details:this.det,bed:this.bed})
    .subscribe((response)=>
    {
      this.showMessage=true;
      this.disMsg="Updated";
      setTimeout(()=>
      {
        this.showMessage=false;
      },2000);
    });
  }

}
