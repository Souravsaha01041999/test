import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

interface HotelDetails
{
  hotel_name:string;
  bed:string;
  location:string;
  details:string;
  image:string;
  price:string;
}

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  constructor(private http:HttpClient,private router:Router) { }

  isLoading=true;
  myMessage="Loading...";

  disMsg="";
  showMessage=false;

  isPopupShow=false;
  hotelHolder:HTMLParagraphElement;
  dateHolder:HTMLInputElement;

  allRooms:HotelDetails[]=[];
  ngOnInit(): void {

    let id=String(localStorage.getItem("id"));
    if(id=="null")
    {
      //LOGIN SHOW
      this.router.navigate(["login"]);
    }

    this.http.post("https://workonits.co.in/OFFICE/getRooms.php",{})
    .subscribe((response:{[key:string]:HotelDetails})=>{
      this.isLoading=false;
      for(let k in response)
      {
        this.allRooms.push(response[k]);
      }

    },(error)=>{
      this.myMessage="Network Error!";
    });
  }

  onAddButton(){
    this.isPopupShow=false;
    let id=String(localStorage.getItem("id"));
    if(id=="null")
    {
      //LOGIN SHOW
      this.router.navigate(["login"]);
    }
    else{
      //ADD INTO CART
      if(String(this.dateHolder.value).length>0)
      {
        //SEND ORDER REQUEST
        this.showMessage=true;
        this.disMsg="Please Wait...!";
        let bid=String(new Date().getDate())+String(new Date().getMonth())+String(new Date().getFullYear())+String(new Date().getHours())+String(new Date().getMinutes())+String(new Date().getSeconds());
        this.http.post("https://workonits.co.in/OFFICE/addOrder.php",{bid:bid,cid:id,hotel:this.hotelHolder.innerHTML,date:this.dateHolder.value})
        .subscribe((response)=>{
          this.disMsg="OrderPlasced";
          setTimeout(()=>{
            this.showMessage=false;
          },3000);
        },(error)=>{
          this.disMsg="Network error";
          setTimeout(()=>{
            this.showMessage=false;
          },3000);
        });
      }
      else{
        this.showMessage=true;
        this.disMsg="Please Select date";
        setTimeout(()=>{
          this.showMessage=false;
        },3000);
      }
    }
  }

  navigateDetails(room:HTMLParagraphElement)
  {
    // this.router.navigate(["roomdetails/"+room.innerHTML]);
    this.router.navigate(["roomdetails"],{queryParams:{roomnumber:room.innerHTML}});
  }

  onCheckDate(event:Event)
  {
    if(new Date((<HTMLInputElement>event.target).value).getTime()<(new Date().getTime()-72000000))
    {
      this.showMessage=true;
      this.disMsg="Please select Valid Date";
      setTimeout(()=>{
        this.showMessage=false;
        (<HTMLInputElement>event.target).value="";
      },2000);
    }
  }

  setPopup(hotelname:HTMLParagraphElement,date:HTMLInputElement)
  {
    this.isPopupShow=true;
    this.hotelHolder=hotelname;
    this.dateHolder=date;
  }

  closePopup()
  {
    this.isPopupShow=false;
  }

}