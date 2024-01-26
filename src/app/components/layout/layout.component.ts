import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isLogged:boolean=false ;
  constructor() { }

  ngOnInit() {
    this.isLoggedIn();
  }
  isLoggedIn() {
    let token = localStorage.getItem("accessToken");
    if (token) {
     
      this.isLogged = true ;
    } else {
      this.isLogged = false ;
    }
   
    return this.isLogged ;

  }
}
