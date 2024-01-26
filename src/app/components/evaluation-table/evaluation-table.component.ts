import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-evaluation-table',
  templateUrl: './evaluation-table.component.html',
  styleUrls: ['./evaluation-table.component.css']
})
export class EvaluationTableComponent implements OnInit {
  teacherId:string ="" ;
  evaluations:[] =[] ;
  constructor(private teacherService:TeacherService , private  router:Router) { }

  ngOnInit() {
    this.teacherId = localStorage.getItem('id') ;
    this.getEvaluations()
  }

  addEval(){
  this.router.navigate(['addEvaluation/' ,this.teacherId])

}

getEvaluations() {
  this.teacherService.getEvaluations(this.teacherId).subscribe(res => {
    this.evaluations = res.evaluations
  } , error => {

  } , () => {

  })
}

goToEditEval(courseId:string , studentId:string){
  this.router.navigate([`editEvaluation/${courseId}/${studentId}` ])
}

deleteEval(){
  
}
  }
 
  

