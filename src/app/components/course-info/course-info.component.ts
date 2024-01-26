import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { allCourses } from 'src/app/data/coursesData';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
title:string="Course Info"
courseId:any;
courses:any=allCourses;
findedCourse:any;
  constructor(private activatedRoute:ActivatedRoute,
     private courseService: CourseService) { }

  ngOnInit() {
    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
   
    if(this.courseId)
    {
      this.getCourse()
    }


  }

  getCourse()
  {
    this.courseService.getCourseById(this.courseId).subscribe(
      (data)=>{
        console.log("here course",data.findedCourse);
        this.findedCourse=data.findedCourse;
      }
    );
  }

}
