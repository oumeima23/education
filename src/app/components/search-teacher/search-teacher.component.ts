import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';




@Component({
  selector: 'app-search-teacher',
  templateUrl: './search-teacher.component.html',
  styleUrls: ['./search-teacher.component.css']
})
export class SearchTeacherComponent implements OnInit {

  searchTeachersForm=FormGroup;
 obj:any={};

  constructor( private router:Router) { }

  ngOnInit() {  
  }

  searchTeachers(){
// console.log('here speciality to find ',this.obj);
localStorage.setItem('specialityToFind',JSON.stringify(this.obj))
this.router.navigate(['allTeachers/search']);
  }

}
