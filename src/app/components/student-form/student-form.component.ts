import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm=FormGroup;
  title:string="Add Student"
  student:any={};
  studentId:any;
  // students:any=allstudents;
  constructor(private activatedRoute:ActivatedRoute,
    private studentService:StudentService,
    private router:Router) { }

  ngOnInit() {

    this.studentId=this.activatedRoute.snapshot.paramMap.get('id');
    if (this.studentId) {
      //(id existe donc on est dans le cas de Edit )
      this.title='Edit Student'
      this.studentService.getStudentById(this.studentId).subscribe(
        (data)=>{
          console.log('here is course obj',data.findedStudent);
          this.student=data.findedStudent;
          
        }
      )
    
    }
  }

  addOrEditStudent(){
    console.log("here is added course",this.student);
      if (this.studentId) {
        //edit
    this.studentService.updateStudent(this.student).subscribe(
      (data)=>{
        console.log('here after edit ',data);
        this.router.navigate(['admin'])
      }
    );
    }
    else{
       //add
       this.studentService.addStudent(this.student).subscribe(
        (data)=>{
          console.log('here data',data);
          this.router.navigate(['admin'])
        }
       );
    
    }
      }

}
