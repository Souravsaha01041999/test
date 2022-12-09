import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingDetails } from './CartDetailsFile';


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
  isRecord=false;

  numberOfData=10;


  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.loadSystem();
  }

  //Initiate the starting all data
  loadSystem()
  {
    let id=String(localStorage.getItem("id"));
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
      this.isRecord=true;
    });
  }

  //If user clicked on previous button
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

  //If user clicked on next button
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


  //If user clicked on only 5 or 10 record to set the value this function is used
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
