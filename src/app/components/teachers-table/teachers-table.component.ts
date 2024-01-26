import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrModule, ToastrService } from 'ngx-toastr';
import { allTeachers } from 'src/app/data/teachersData';
import { TeacherService } from 'src/app/services/teacher.service';




@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
  teachers:any=[];
  constructor( private teacherServices:TeacherService ,
    private router:Router,
    private toastr:ToastrService ) { }

  ngOnInit() {
 this.allTeachers();
   
  }

  allTeachers(){
    this.teacherServices.getAllTeachers().subscribe(
      (data)=>{
        console.log("here response",data);
        this.teachers=data.teachersTab; 
      });
  }
   
  goToDisplayTeacher(id:number){
    this.router.navigate([`teacherInfo/${id}`])
  }
  goToEditTeacher(id:number){
this.router.navigate([`editTeacher/${id}`])
  }

  
  deleteTeacherById(id:number){
    this.teacherServices.deleteTeacher(id).subscribe(
      (data)=>{
        console.log('here after delete',data.message);
        this.allTeachers();
      }
    )   
}

activateTeacher(id:number){
  this.teacherServices.activateTeacher(id).subscribe(
    (data)=>{
      console.log('here after delete',data.message);
      this.allTeachers();
      this.toastr.success("Teacher activé avec succés" , "succès")
    }
  )   
}
}
