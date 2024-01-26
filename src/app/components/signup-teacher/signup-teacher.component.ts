import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeacherService } from 'src/app/services/teacher.service';
import { GlobalWorkerOptions } from 'pdfjs-dist/build/pdf';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {
  signupTeacherForm: FormGroup;
  imagePreview:any;
  @ViewChild('filePiker',{static:true}) fileInput: ElementRef;
  pdfSrc: SafeResourceUrl = ''; // Store PDF data

  constructor(private X: FormBuilder,
    private teacherService: TeacherService,
    private router:Router,
    private toastr: ToastrService,
    protected sanitizer: DomSanitizer) { 
      //GlobalWorkerOptions.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';

    }

  ngOnInit() {
    this.signupTeacherForm = this.X.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [''] ,
      email: [''] ,
      password: ['',[Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{4,9}"),],],
      tel: [''] ,
      adress: [''] ,
      speciality: [''] ,
      pdf: [''] , 
    })
  }

  get f()
  {
    return this.signupTeacherForm.controls ;
  }
  signup() {
    console.log('LASTNAME', this.signupTeacherForm.get('lastName').value);

    console.log('signup cliked', this.signupTeacherForm.value);
    this.signupTeacherForm.value.role = "Teacher";
    this.teacherService.addTeacher(this.signupTeacherForm.value).subscribe(
      (data) => {
        console.log('here data after signup', data);
        this.toastr.success('Inscription effectué avec succès!', 'Succès');
        this.router.navigate(['login'])
      }
    )
  }
  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }
  onFileSelected(event:any)
  {
    const file = event.target.files[0];

    if (file) {
      this.readFileContent(file);
    }
  }

  readFileContent(file: File): void {
    const reader = new FileReader();

  reader.onload = (e: any) => {
    const pdfData = new Uint8Array(e.target.result);
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
  };

  reader.readAsArrayBuffer(file);
  }
}
