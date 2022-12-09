import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

interface BookingDetails {
  bookingid: string;
  cid: string;
  hotel_name: string;
  date: string;
  status: string;
  bed: string;
  location: string;
  details: string;
  username: string;
  name: string;
  email: string;
  address: string;
  addharnumber: string;
  mobile: string;
  userimage: string;
  addharimage: string;
  role: string;
  price: string;
}

@Component({
  selector: 'app-customerdetails',
  templateUrl: './customerdetails.component.html',
  styleUrls: ['./customerdetails.component.css']
})
export class CustomerdetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  data: BookingDetails;
  ngOnInit(): void {
    this.loadSystem();
  }

  loadSystem()
  {
    let bid = this.route.snapshot.params["bid"];
    this.http.post("https://workonits.co.in/OFFICE/getCustomerDetails.php", { bid: bid })
      .subscribe((response: BookingDetails) => {
        this.data = response;
        this.data.userimage = "https://workonits.co.in/OFFICE/image/" + this.data.userimage;
        this.data.addharimage = "https://workonits.co.in/OFFICE/addharimage/" + this.data.addharimage
      });
  }

  //print all details
  onPrint() {
    var divElementContents = document.getElementById("dipsprint").innerHTML;
    var windows = window.open("", "", "height=800, width=800");
    windows.document.write(divElementContents);
    windows.document.close();
    windows.print();
    setInterval(function () {
      windows.close();
    }, 500);
  }
}
