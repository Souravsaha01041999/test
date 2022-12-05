import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: '[display-message]',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor() { }

  @Input() message="";
  ngOnInit(): void {
  }


}
