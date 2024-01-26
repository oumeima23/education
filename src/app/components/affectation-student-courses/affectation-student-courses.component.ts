import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/services/course.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-affectation-student-courses',
  templateUrl: './affectation-student-courses.component.html',
  styleUrls: ['./affectation-student-courses.component.css']
})
export class AffectationStudentCoursesComponent implements OnInit {
  courses:[] ;
  courseId:string = null ;
  studentid:string ="" ;
  constructor(private courseService:CourseService ,
     private activatedRoute:ActivatedRoute ,
      private studentService:StudentService,
      private toastr: ToastrService,
      private router:Router)  { }

  ngOnInit() {
    this.getAvailableCourses();
    this.studentid=this.activatedRoute.snapshot.paramMap.get('studentid');
  }

  getAvailableCourses()
  {
    this.courseService.getAvailableCourses().subscribe(
      res => {
        this.courses = res.coursesTab ;
      } , error => {
        console.error(error)
      }
    )
  }
  affectStudentToCourse(){
    let obj ={
      courseid : this.courseId
    }
    this.studentService.affectCourse(this.studentid , obj).subscribe(
      res => {
        this.toastr.success("Etudiant affectué au cours " , "Succès");
        this.router.navigate(['admin'])
      } , error => {
        console.error(error)
      }
    )
    
  }
}
