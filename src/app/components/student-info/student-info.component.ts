
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
title:string="Student Info"
student:any;
students:any;
studentId:any;
findedStudent:any;
  constructor( private activatedRoute:ActivatedRoute ,
    private studentService:StudentService) { }

  ngOnInit() {
    this.studentId=this.activatedRoute.snapshot.paramMap.get('id');
    this.studentService.getStudentById(this.studentId).subscribe(
      (data)=>{
        console.log('here student',data.findedStudent);
        this.findedStudent=data.findedStudent;
      }
    )
  }
}
