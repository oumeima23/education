import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentInfo } from 'src/app/models/studentInfo';
import { StudentService } from 'src/app/services/student.service';


@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {
  students:StudentInfo[]=[];
  path:string="";
 isDisplayed:boolean=false;
 baseUrl = "http://localhost:3000/"
  constructor( private router:Router,private studentService:StudentService) { }

  ngOnInit() {
   
    //récupérer le path
   this.path= this.router.url;
   if (this.path =='/admin') {
    this.isDisplayed = true;
    this.getAllStudents()
   }

  }
  getAllStudents(){
    this.studentService.getAllStudents().subscribe(
      (data)=>{
        this.students=data.studentsTab;
        console.log("students",this.students);
        this.students.forEach(
          s => {
            let url =  this.baseUrl + s.image.replace(/\\/g, '/')
            
            let finalUrl = url.replace('/backend/' ,'/')
            s.image = finalUrl
            
          }
        )
      }
    );
  }
  
  goToDisplayStudent(id){
this.router.navigate([`studentInfo/${id}`])
  }

  goToEditStudent(id:number){
    this.router.navigate([`editStudent/${id}`])
  }
  
  goToDeletStudent(id:number){
    this.studentService.deleteStudent(id).subscribe(
      (data)=>{
        console.log('here after delete',data.message);
        this.getAllStudents();
      }
    )
  }
 
  goToAffectation(id:number)
  {
    this.router.navigate([`affectationStudentCourses/${id}`])
  }
 
}
