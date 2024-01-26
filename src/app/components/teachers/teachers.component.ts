import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allTeachers } from 'src/app/data/teachersData';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
teachers:any=[];
specialityToFind:any;
findedTeachers:any=[];
path:string;
  constructor(private  router:Router , private teacherService:TeacherService) { }

  ngOnInit() {
    // this.teachers= allTeachers;
    //appel de la méthode du service 
    this.teacherService.getAllTeachers().subscribe(
      (data)=>{
        console.log('here teacher',data.teachersTab);
        this.teachers = data.teachersTab;
        
      }
    );

    //get from LS
   this.specialityToFind= JSON.parse(localStorage.getItem('specialityToFind'))
    //search teachers
    for (let i = 0; i < this.teachers.length; i++) {
      if (this.teachers[i].speciality==this.specialityToFind.speciality) {
        this.findedTeachers.push(this.teachers[i]);
      }
      
    }
    this.path=this.router.url;
    //condition for the path 
if (this.path= '/allTeachers/search') {
  this.teachers = this.findedTeachers;
  
}
  }

}
