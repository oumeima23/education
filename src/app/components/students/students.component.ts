import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
title:string="Students"
students:any=[];
  constructor(private studentService:StudentService) { }

  ngOnInit() {
     //appel de la méthode du service 
    this.studentService.getAllStudents().subscribe(
      (data)=>{
        console.log('here course',data.StudentsTab);
        this.students = data.StudentsTab;
        
      }
    )
  }

}
