import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allCourses } from 'src/app/data/coursesData';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
courses:any=[];

  constructor(private router:Router,
    private courseService:CourseService) { }


  ngOnInit() {
    // this.courses= allCourses;
    // this.courseService.getAllCourses().subscribe(
    //   (data)=>{
    //     console.log("here response",data);
    //     this.courses=data.t;
        
    //   }
    // );
    this.allCourses();
  }
  allCourses(){
    this.courseService.getAllCourses().subscribe(
      (data)=>{
        console.log("here response",data);
        this.courses=data.coursesTab;
        
      }
    );
  }

  goToDisplay(id:number){
this.router.navigate([`courseInfo/${id}`])
  }


  deleteCourseById(id:number){
this.courseService.deleteCourse(id).subscribe(
  (data)=>{
    console.log('here after delete',data.message);
    this.allCourses(); 
  }
);
  }
}
