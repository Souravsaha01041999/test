import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface AxisPoints
{
  label:string;
  y:number;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,private http:HttpClient) { }

  link="https://images.moneycontrol.com/static-mcnews/2019/09/Samhi_Hotels.jpg?impolicy=website&width=770&height=431";
  allImages=["https://images.moneycontrol.com/static-mcnews/2019/09/Samhi_Hotels.jpg?impolicy=website&width=770&height=431",
  "https://r1imghtlak.mmtcdn.com/c229crhr5t6hr5e2dgkt8pmj005c.jpg?&output-quality=75&downsize=583:388&crop=583:388;74,0&output-format=jpg",
  "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768"];
  i=0;

  showGraph=false;
  chartOptions={};
  axisData:AxisPoints[]=[];
  ngOnInit(): void {
    setInterval(()=>{
      this.link=this.allImages[this.i];
      this.i++;
      
      if(this.i==this.allImages.length)
      {
        this.i=0;
      }
    },4000);

    let id=String(localStorage.getItem("id"));
    if(id=="null")
    {
      //LOGIN SHOW
      this.router.navigate(["login"]);
    }

    let currentDate=String(new Date().getFullYear())+"-"+String(new Date().getMonth()+1)+"-"+String(new Date().getDate());
    //To getting the chart data if the role is admin
    let role=String(localStorage.getItem("role"));
    if(role=="admin")
    {
      this.showGraph=true;
      this.http.post("https://workonits.co.in/OFFICE/getCount.php",{date:currentDate})
      .subscribe((response:{[key:string]:AxisPoints})=>
      {
        for(let k in response)
        {
          this.axisData.push({label:response[k].label,y:Number(response[k].y)});
        }
        this.chartOptions = {
          title: {
            text: "Our Booking Between 7 days"
          },
          animationEnabled: true,
          axisY: {
          includeZero: true
          },
          data: [{
          type: "column",
          indexLabelFontColor: "#5A5757",
          dataPoints: this.axisData
          }]
        };
      });
    }
    else
    {
      this.showGraph=false;
    }
  }

}
