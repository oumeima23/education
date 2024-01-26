import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css']
})
export class DashboardStudentComponent implements OnInit {
  evaluations:any ;
  userId
  constructor(private studentService:StudentService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('id') ;
    this.getEvaluations()

  }

  getEvaluations()
  {
    this.studentService.getStudentEvals(this.userId).subscribe(res => {
      this.evaluations = res.studentEvals
    } , error => {
      console.error(error)
    })
  }

}
