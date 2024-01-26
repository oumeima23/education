import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { allCourses } from 'src/app/data/coursesData';
import { CourseService } from 'src/app/services/course.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseForm:FormGroup;
  title:string=""
  course:any={};
  courseId:any;
  courses:any=allCourses;
  techers:any=[];
  obj:any={};
  teacherId:any;

  constructor( private activatedRoute:ActivatedRoute ,
    private courseService:CourseService,
    private router:Router,
    private formBuilder:FormBuilder,
    
     private toastr:ToastrService) { }

  ngOnInit() {
    this.courseForm =this.formBuilder.group({
      nom:[''],
      description:[''],
      duration:[''],
    });
  this.courseId=this.activatedRoute.snapshot.paramMap.get('id');
  this.teacherId=this.activatedRoute.snapshot.paramMap.get('teacherid');
if (this.courseId == '0') {
  //(id existe donc on est dans le cas de Edit )
  this.title='Add Course'
} else {
  
  this.title='Edit Course'
  this.courseService.getCourseById(this.courseId).subscribe(
    (data)=>{
      console.log('here is course obj',data.findedCourse);
      this.course=data.findedCourse;
      
    } , error => {
       console.error(error)
    } ,() => {
      /*this.courseForm.patchValue({
        nom:this.course.nom ,
        description:this.course.description,
        duration:this.course.duration
      })*/
    }
  )
}


}



  addOrEditCourse(){



  if (this.courseId!='0') {
    //edit
this.courseService.updateCourse(this.course).subscribe(
  (data)=>{
    console.log('here after edit ',data);
    this.toastr.success("Cours modifié  avec succès" , "succès")
    this.router.navigate(['dashboardTeacher'])
  }
);
}
else{
   //add
   this.courseService.addCourse(this.course ,this.teacherId ).subscribe(
    (data)=>{
      console.log('res',data);
      this.toastr.success("Cours ajouté  avec succès" , "succès")
      this.router.navigate(['dashboardTeacher']);
    } , error => {
      console.error(error)
    }
   )
}
  }
 
}
