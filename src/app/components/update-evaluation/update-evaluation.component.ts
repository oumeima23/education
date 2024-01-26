import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/services/student.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-update-evaluation',
  templateUrl: './update-evaluation.component.html',
  styleUrls: ['./update-evaluation.component.css']
})
export class UpdateEvaluationComponent implements OnInit {
  submitted:boolean = false ;
  formEval:FormGroup ;
  courseId:string ="" ;
  studentId:string ="" ;

  evaluation:any
  constructor(private activatedRoute:ActivatedRoute,
    private teacherService:TeacherService ,
     private fb:FormBuilder,
     private toastr:ToastrService ,
     private router:Router) { 
      this.courseId=this.activatedRoute.snapshot.paramMap.get('courseid');
      this.studentId=this.activatedRoute.snapshot.paramMap.get('studentid');

      this.formEval = this.fb.group({
    
        note: ['' , Validators.required],
        eval: ['' , Validators.required],
      })
      this.getEvaluation()
     }

  ngOnInit() {
   
  }

  getEvaluation()
  {
    this.teacherService.getEvaluation(this.courseId , this.studentId).subscribe(res => {
      this.evaluation = res.evaluation
    } , error => {
      console.error(error)
    } , () => {
      this.formEval.patchValue({
        note:this.evaluation.note ,
        eval:this.evaluation.evaluation
      })
    })
  }
  updateEval()
  {
    this.submitted = true ;
      if(this.formEval.invalid)
      {
        return ;
      }

    let data = {
      note: this.formEval.get('note').value ,
      evaluation: this.formEval.get('eval').value 
    }

    this.teacherService.updateEvaluation(this.courseId , this.studentId ,data).subscribe(
      res => {
          this.toastr.success("Modification effectuée avec succès " ,"Succès")
          this.router.navigate(['dashboardTeacher'])
      } , error => {
        console.error(error)
      }
    )
  }
}
