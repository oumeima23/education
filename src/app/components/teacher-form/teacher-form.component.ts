import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { allTeachers } from 'src/app/data/teachersData';
import { CourseService } from 'src/app/services/course.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent implements OnInit {
title:string=" edit Teacher"
teacherForm:FormGroup;
  teacherId:any;
  teacher:any={};
  id:any;
  obj:any={};

  courses:any=[];
  constructor( private formBuilder:FormBuilder ,                                                         
    private teacherService:TeacherService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private toastr : ToastrService
   ) {
    this.teacherForm= this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:[''],
      speciality:[''],
      email:[''],
    })
    }

  ngOnInit() {
 

    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
     
      this.getTeacher()
      
    }

  
  }


  editTeacher(){

if (this.id) {
  //edit

  let obj = {
    "_id":this.teacher._id ,
    "firstName":this.teacherForm.get('firstName').value,
    "lastName":this.teacherForm.get('lastName').value,
    "email":this.teacherForm.get('email').value,
    "speciality" : this.teacherForm.get('speciality').value

  }


this.teacherService.updateTeacher(obj).subscribe(
  (data)=>{
    this.toastr.success("Teacher modifié avec succès " , "Succès")
    this.router.navigate(['admin'])
  }
);
}

  }
 
  getTeacher()
  {
    this.teacherService.getTeacherInfos(this.id).subscribe(
      res => {
        this.teacher = res.findedTeacher
      } , error => {
        console.error(error)
      } , () => {
        this.teacherForm.patchValue({
          firstName : this.teacher.firstName , 
          lastName : this.teacher.lastName , 
          speciality : this.teacher.speciality , 

          email : this.teacher.email  


        })
      }
    )
  }

}
