import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AllOrderDetails } from './AllDetailsFile';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  constructor(private http:HttpClient,private router:Router) { }

  allOrderList:AllOrderDetails[]=[];
  displayData:AllOrderDetails[]=[];
  disMsg="";
  showMessage=false;

  ngOnInit(): void {
    //We are loaded all data
    this.loadData();
  }

  //Here loaded the data from the server into that application
  loadData()
  {
    this.allOrderList=[];
    this.displayData=[];
    this.http.post("https://workonits.co.in/OFFICE/getAllOrders.php",{})
    .subscribe((response:{[key:string]:AllOrderDetails})=>{

      for(let k in response)
      {
        this.allOrderList.push(response[k]);
      }
      this.displayData=this.allOrderList;
    },(error)=>{
      this.showMessage=true;
        this.disMsg="Error Network";
        setTimeout(()=>{
          this.showMessage=false;
        },3000);
    });
  }

  //Here seted the status
  onSendBtn(sendbid:HTMLInputElement,sendrad1:HTMLInputElement,sendrad2:HTMLInputElement)
  {
    let settingStatus="";

    if(sendrad1.checked)  //confirmed
    {
      settingStatus="confirmed";
    }
    if(sendrad2.checked)  //rejected
    {
      settingStatus="rejected";
    }
    if(settingStatus.length>0)
    {
      this.http.post("https://workonits.co.in/OFFICE/setStatus.php",{bid:sendbid.value,status:settingStatus})
      .subscribe((response)=>{
        //SHOW MESSAGE
        this.showMessage=true;
        this.disMsg="Updated";
        setTimeout(()=>{
          this.showMessage=false;
        },3000);
        this.loadData();

      },(error)=>{
        this.showMessage=true;
        this.disMsg="Error Network";
        setTimeout(()=>{
          this.showMessage=false;
        },3000);
      });
    }
    else{
      //SHOW MESSAGE PLEASE SELECT STATUS
      this.showMessage=true;
      this.disMsg="Please select status";
      setTimeout(()=>{
        this.showMessage=false;
      },3000);
    }

  }

  //If user clicked on id
  redirectCd(bid:HTMLTableColElement)
  {
    this.router.navigate(["cdetails/"+bid.innerHTML]);
  }

  //If user clicked on filter
  onFilterChange(event:Event)
  {
    let fil=(<HTMLInputElement>event.target).value;
    this.displayData=[];
    for(let d in this.allOrderList)
    {
      if((this.allOrderList[d].status==fil)||(fil=="all"))
      {
        this.displayData.push(this.allOrderList[d]);
      }
    }
  }

}
