import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-best-teachers',
  templateUrl: './best-teachers.component.html',
  styleUrls: ['./best-teachers.component.css']
})
export class BestTeachersComponent implements OnInit {
 @Input() y:any;
  constructor() { }

  ngOnInit() {
  }

}
