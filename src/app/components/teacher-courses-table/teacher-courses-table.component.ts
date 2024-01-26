import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allCourses } from 'src/app/data/coursesData';
import { TeacherCourseService } from 'src/app/services/teacher-course.service';

@Component({
  selector: 'app-teacher-courses-table',
  templateUrl: './teacher-courses-table.component.html',
  styleUrls: ['./teacher-courses-table.component.css']
})
export class TeacherCoursesTableComponent implements OnInit {

  constructor(private router:Router , private teacherCourseService:TeacherCourseService) { }
  teacherId:string ="" ;
  courses:[] ;
  ngOnInit() {
    this.teacherId = localStorage.getItem('id') ;
    this.getTeacherCourses()

  
  }

  addCourse(){
    this.router.navigate([ 'addCourse/',0,this.teacherId])
  }

  getTeacherCourses(){  
      this.teacherCourseService.getAllTeacherCourses(this.teacherId).subscribe(res => {
        this.courses = res.coursesTab
        console.log('res  ' , res.coursesTab)
      } , error => {})
  }

  goToEdit(id:number){
    const url = "editCourse/" + id + "/" + this.teacherId ;
    this.router.navigate([url])
  }
  
  goToDisplay(id:number){
    this.router.navigate([`courseInfo/${id}`])
      }
      
//   deleteCourseById(id:number){
// this.teacherCourseService.deleteCourse(id).subscribe(
//   (data)=>{
//     console.log('here after delete',data.message);
//     this.deleteCourseById(id); 
//   }
// );
// } 

  deleteTeacherCourseById(id: number) {
    this.teacherCourseService.deleteCourse(id).subscribe(
      (data) => {
        console.log('Cours supprimé avec succès', data.message);
        // Mettez ici le code à exécuter après la suppression du cours
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression du cours', error);
        // Mettez ici le code de gestion des erreurs
      }
    );
  }


viewStudents(id:number ,nom:string ){

  this.router.navigate([`/coursStudentsTable/${id}` ,{courseName:nom}]  )
}

}
