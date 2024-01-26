import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: any;
  isLogged:boolean = false ;
  constructor( private router :Router , private userService:UserService) { }
  @Input()
 
  ngOnInit() {
    
    this.userService.isLogguedIn$.subscribe((isLoggedIn) => {
      this.isLogged = isLoggedIn
    })
  }
  isLoggedIn() {
    let token = localStorage.getItem("accessToken");
    if (token) {
      this.user = this.decodeToken(token);
      this.userService.setLogguedIn(true) ;
    } 
   

  }



  decodeToken(token: string) {
    return jwt_decode(token);
  }

  
  logOut(){
    localStorage.removeItem("accessToken");
    this.router.navigate(['']);
    this.userService.setLogguedIn(false) ;

  }

  goSignUpTeacher()
  {
    this.router.navigate(['signupTeacher'])
  }

  goSignUpStudent()
  {
    this.router.navigate(['signupStudent'])
  }

  goSignUpParent()
  {
    this.router.navigate(['signupParent'])
  }

}
