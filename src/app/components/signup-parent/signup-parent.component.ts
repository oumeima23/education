import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ParentService } from 'src/app/services/parent.service';


@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrls: ['./signup-parent.component.css']
})
export class SignupParentComponent implements OnInit {

signupParentForm:FormGroup;
telChildError:string ="" ;
  constructor( private X :FormBuilder,
    private parentService:ParentService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.signupParentForm =this.X.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:[''],
      email:[''],
      password:[''],
      tel:[''],
      adress:[''],
      telChild :['']
    })
  }
  signup(){
    console.log('signup cliked',this.signupParentForm.value);
    this.signupParentForm.value.role = "Parent";
    this.parentService.addParent(this.signupParentForm.value).subscribe(
      (res) => {
        console.log('here data after signup', res);
        this.toastr.success('Inscription effectuée avec succès ' , "succès")
        this.router.navigate(['login'])
      } ,error => {
        console.error("msg",error.error.msg)
        this.telChildError = error.error.msg ;
        
     
      }
    )
  }
}
