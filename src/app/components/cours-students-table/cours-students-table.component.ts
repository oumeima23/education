import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-cours-students-table',
  templateUrl: './cours-students-table.component.html',
  styleUrls: ['./cours-students-table.component.css']
})
export class CoursStudentsTableComponent implements OnInit {
 courseName :string ="" ;
 courseId:string ="" ;
  baseUrl ="http://localhost:3000/"
 students:any
  constructor(private route: ActivatedRoute ,
    private courseService:CourseService) { 
    this.courseName = this.route.snapshot.paramMap.get('courseName');
    this.courseId=this.route.snapshot.paramMap.get('courseid');
  }

  ngOnInit() {
   
    this.getStudentsByCourse()
  }

  getStudentsByCourse()
  {
    this.courseService.getStudentsByCourse(this.courseId).subscribe(
      res => {
        console.log('res  30' , res)
          this.students= res.studentTab
      } , error => {
            console.error(error)
      } , () => {
        this.students.forEach((s) => {
          let url =  this.baseUrl + s.image.replace(/\\/g, '/')
            
            let finalUrl = url.replace('/backend/' ,'/')
            s.image = finalUrl
        })
      }
    )
  }

}
