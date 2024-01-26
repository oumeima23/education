import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-add-eval',
  templateUrl: './add-eval.component.html',
  styleUrls: ['./add-eval.component.css']
})
export class AddEvalComponent implements OnInit {
  teacherId:string ="" ;

  courses:[] ;
  students:[] ;
  formEval:FormGroup ;
  submitted:boolean = false ;
  constructor(private activatedRoute:ActivatedRoute,
     private teacherService:TeacherService ,
      private fb:FormBuilder,
      private studentService:StudentService ,
      private toastr:ToastrService ,
      private router:Router ) {
    this.teacherId=this.activatedRoute.snapshot.paramMap.get('teacherid');

    this.formEval = this.fb.group({
      courseId: [null , Validators.required],
      studentId: [null , Validators.required],
      note: ['' , Validators.required],
      eval: ['' , Validators.required],
    })

   }

  ngOnInit() {
    this.getCourses()
  }

  getCourses()
  {
    this.teacherService.getCourses(this.teacherId).subscribe(
      res => {
        this.courses = res.coursesTab
      } , error => {
          console.error(error)
      } , () => {

      }
    )
  }

  getStudentsByCourse()
  {
    this.formEval.get('studentId').setValue(null) ;
    if(this.formEval.get('courseId').value != null && this.formEval.get('courseId').value != undefined)
    {

      this.studentService.getStudientsByCourse(this.formEval.get('courseId').value).subscribe(
        res => {
          this.students = res.studentTab
        } , error => {
          console.error(error)
        }
      )
    }
   
  }

  addEval()
  {
      this.submitted = true ;
      if(this.formEval.invalid)
      {
        return ;
      }

      let obj =  {
        "courseid" : this.formEval.get('courseId').value,
        "studentid" : this.formEval.get('studentId').value,
        "note" : this.formEval.get('note').value,
        "eval" : this.formEval.get('eval').value

      }

      this.teacherService.addEvaluation(obj).subscribe(res => {
          this.toastr.success("Evaluation effectué evec succès" , "Succès") ;
          this.router.navigate(['dashboardTeacher'])
      } , error => {
        console.error(error)
      })

  }

}
