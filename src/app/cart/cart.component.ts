import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface BookingDetails
{
  bookingid:string;
  cid:string;
  hotel_name:string;
  date:string;
  status:string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  allDetails:BookingDetails[]=[];
  displayList:BookingDetails[]=[];
  disMsg="";
  showMessage=false;
  position=0;
  isLeft=false;
  isRight=false;
  page=0;

  numberOfData=10;


  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    let id=String(localStorage.getItem("id"));
    if(id=="null")
    {
      //LOGIN REQUIRED HERE
      this.router.navigate(["login"]);
    }
    else{
      //OPEN CART HERE
      this.http.post("https://workonits.co.in/OFFICE/getMyOrders.php",{cid:id})
      .subscribe((response:{[key:string]:BookingDetails})=>{

        for(let k in response)
        {
          this.allDetails.push(response[k]);
        }
        this.nextItem();
        this.isRight=true;
        this.isLeft=false;
        // this.displayList=this.allDetails;
      },(error)=>{
        this.showMessage=true;
        this.disMsg="No Order";
        setTimeout(()=>{
          this.showMessage=false;
        },3000);
      });
    }
  }6

  previousItem()
  {
    this.page--;
    this.position-=this.numberOfData; //10 ITEMS
    let pos=this.position-this.numberOfData;;
    this.displayList=[];
    
    while((pos<this.position)&&(pos<this.allDetails.length))
    {
      this.displayList.push(this.allDetails[pos]);
      pos++;
    }
    if(this.position<this.allDetails.length)
    {
      this.isRight=true;
    }
    if(this.position==this.numberOfData)
    {
      this.isLeft=false;
    }

  }
  nextItem()
  {
    this.page++;
    this.position+=this.numberOfData; //10 ITEMS
    let pos=this.position-this.numberOfData;
    this.displayList=[];
    while((pos<this.position)&&(pos<this.allDetails.length))
    {
      this.displayList.push(this.allDetails[pos]);
      pos++;
    }
    this.isLeft=true;
    if(this.position>this.allDetails.length-1)
    {
      this.isRight=false;
    }
    
  }

  setVal(event:Event)
  {
    
    this.page--;
    this.position-=this.numberOfData;
    this.numberOfData=parseInt((<HTMLInputElement>event.target).value);
    this.nextItem();
    this.isRight=true;
    this.isLeft=false;
  }

}
