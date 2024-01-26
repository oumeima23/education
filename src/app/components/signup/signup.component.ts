import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  title: string = "Signup "
  path: string;
  constructor(private X: FormBuilder,
     private userService: UserService,
    private router:Router) { }

  ngOnInit() {
    this.signupForm = this.X.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''],
      email: [''],
      password: ['',[ Validators.required, Validators.pattern( "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{4,9}"  ), ],],
      tel: ['']
    })
  }

  signup() {

    console.log('signup cliked',this.signupForm.value);
    this.signupForm.value.role = "Admin";
      this.userService.signup(this.signupForm.value).subscribe(
        (data) => {
          console.log('here data after signup', data);
          this.router.navigate(['login'])
        }
      )
  }
}
