import { Component, OnInit } from '@angular/core';
import { allCourses } from 'src/app/data/coursesData';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses:any=[];
  

  constructor( private courseService:CourseService) { }

  ngOnInit() {
    // this.courses= allCourses;
    //appel de la méthode du service 
    this.courseService.getAllCourses().subscribe(
      (data)=>{
        console.log('here course',data.coursesTab);
        this.courses = data.coursesTab;
        
      }
    );


  }

}
