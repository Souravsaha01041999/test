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
    this.systemLoad();
  }

  systemLoad()
  {
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

  //When user will book ny room this method will call
  onAddButton(){
    this.isPopupShow=false;
    let id=String(localStorage.getItem("id"));
    //ADD INTO CART
    if(String(this.dateHolder.value).length>0)
    {
      //SEND ORDER REQUEST
      this.showMessage=true;
      this.disMsg="Please Wait...!";
      let bid=id+String(new Date().getDate())+String(new Date().getMonth())+String(new Date().getFullYear())+String(new Date().getHours())+String(new Date().getMinutes())+String(new Date().getSeconds());
      this.http.post("https://workonits.co.in/OFFICE/addOrder.php",{bid:bid,cid:id,hotel:this.hotelHolder.innerHTML,date:this.dateHolder.value},{responseType:'text'})
      .subscribe((response)=>{

        //CHECK HERE ROOM IS ALREADY BOOKED OR NOT THE DISPLAY MESSAGE
        if(response=="1")
        {
          this.disMsg="OrderPlasced";
          setTimeout(()=>{
            this.showMessage=false;
          },3000);
        }
        else
        {
          this.disMsg="On that date the room already booked";
          setTimeout(()=>{
            this.showMessage=false;
          },3000);
        }


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

  //When user will open any room details that time this method will call
  navigateDetails(room:HTMLParagraphElement)
  {
    this.router.navigate(["roomdetails"],{queryParams:{roomnumber:room.innerHTML}});
  }

  //When user enter any date its checks the date is old date or not
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

  //Set the popup
  setPopup(hotelname:HTMLParagraphElement,date:HTMLInputElement)
  {
    this.isPopupShow=true;
    this.hotelHolder=hotelname;
    this.dateHolder=date;
  }
  //When user will share the room details that time this metod will call
  copyLink(hotel:HTMLParagraphElement)
  {
    let data=String(window.location.href).replace("rooms","roomdetails?roomnumber="+hotel.innerHTML);
    navigator.share({title:'Room',text:'See Room Details',url:data});
  }

  //When we will call the method the popup will close
  closePopup()
  {
    this.isPopupShow=false;
  }

}