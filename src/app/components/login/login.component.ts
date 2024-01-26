import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import jwt_decode from 'jwt-decode';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm:FormGroup;

errorMsg:string="";
submitted :boolean = false ;
  constructor( private userService:UserService ,
    private router:Router,
    private toastr:ToastrService,
    private fb:FormBuilder) {
      this.loginForm = this.fb.group(
        {
          tel: ['' , Validators.required],
          password: ['',Validators.required]
        }
      )
     }

  ngOnInit() {
    localStorage.clear()
  }
  

  login(){
    this.submitted = true ;
    if(this.loginForm.invalid)
    {
      return ;
    }
   let obj = {
    tel:this.loginForm.get('tel').value,
    password:this.loginForm.get('password').value,
   }
   
    this.userService.login(obj).subscribe(
      (data)=>{
        localStorage.setItem("accessToken" , data.token);
        localStorage.setItem("id" , data.id)
        this.userService.setLogguedIn(true) ;
        console.log('here data',data);
        if (data.role=='Parent') {
          this.router.navigate(['searchEvalChild'])

        } else if (data.role=='Student') {
          this.router.navigate(['dashboardStudent'])
          
        }  else if (data.role=='Teacher') {
          this.router.navigate(['dashboardTeacher'])

        } else if (data.role=='Admin') {
          this.router.navigate(['admin'])

        } else{

          this.errorMsg="please check tel/password"

        }
      } ,error => {
        console.error("msg " ,error.error.error)
        this.toastr.error(error.error.error , "Erreur")
      }
    )
  }

  decodeToken(token:string){
    return jwt_decode(token);
  }

}
