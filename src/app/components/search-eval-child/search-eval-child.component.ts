import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ParentService } from 'src/app/services/parent.service';

@Component({
  selector: 'app-search-eval-child',
  templateUrl: './search-eval-child.component.html',
  styleUrls: ['./search-eval-child.component.css']
})
export class SearchEvalChildComponent implements OnInit {
searchEvalChildForm:FormGroup;
telChild:number ;

studentEvaluations:[] =[] ;

errorMsg:string ="" ;
  constructor( private router :Router , private parentService:ParentService) { }

  ngOnInit() {
  }
  searchEvalChild(){
    this.errorMsg ='';
    this.studentEvaluations = [];
    if(this.telChild != null && this.telChild != undefined)
    {
      let obj = {
        telChild:this.telChild 
      }
      // console.log('here telChild to find Eval ',this.obj);
      this.parentService.searchChildEvals(obj).subscribe(
        res => {
         this.studentEvaluations = res.childEvals
        } , error => {
          console.error(error);
          this.errorMsg = error.error.error
        }
      )
    }
    
      }
}
