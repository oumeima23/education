import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-signup-student',
  templateUrl: './signup-student.component.html',
  styleUrls: ['./signup-student.component.css']
})
export class SignupStudentComponent implements OnInit {


signupStudentForm:FormGroup;
imagePreview : any;
path:any;
  constructor(private X :FormBuilder,
              private studentService:StudentService,
              private router:Router, 
              private toastr:ToastrService) { }

  ngOnInit() {
    this.signupStudentForm= this.X.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:[''],
      email:[''],
      password:[''],
      tel:[''],
      adress:[''],
      img:['']
    
    })
  }


signup(){
  this.signupStudentForm.value.role = "Student";
  var data: any = new FormData();
  data.append("firstName" , this.signupStudentForm.value.firstName)
  data.append("lastName" , this.signupStudentForm.value.lastName)
  data.append("email" , this.signupStudentForm.value.email)
  data.append("password" , this.signupStudentForm.value.password)
  data.append("tel" , this.signupStudentForm.value.tel)
  data.append("adress" , this.signupStudentForm.value.adress)
  data.append("role" , this.signupStudentForm.value.role)
  data.append("file" , this.signupStudentForm.value.img)


    this.studentService.addStudent(data).subscribe(
      (data) => {
        console.log('here data after signup', data);
        this.toastr.success('Inscription effectuée avec succès ' , "succès")
        this.router.navigate(['login'])
      }
    )
}

// add-X.ts
onImageSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.signupStudentForm.patchValue({ img: file });
  this.signupStudentForm.updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
  this.imagePreview = reader.result as string
  };
  reader.readAsDataURL(file);
  }
}
