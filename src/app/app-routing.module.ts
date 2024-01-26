import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { HomeComponent } from './components/home/home.component';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StudentsComponent } from './components/students/students.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { EvaluationTableComponent } from './components/evaluation-table/evaluation-table.component';

import { AffectationStudentCoursesComponent } from './components/affectation-student-courses/affectation-student-courses.component';
import { CoursStudentsTableComponent } from './components/cours-students-table/cours-students-table.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { AddEvalComponent } from './components/add-eval/add-eval.component';
import { SearchEvalChildComponent } from './components/search-eval-child/search-eval-child.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UpdateEvaluationComponent } from './components/update-evaluation/update-evaluation.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  {path:"" , component:LayoutComponent , children:[
    {path:"",component:HomeComponent},
    {path:"login",component:LoginComponent},
    {path:"signup",component:SignupComponent},
    {path:"signupTeacher",component:SignupTeacherComponent},
    {path:"signupStudent",component:SignupStudentComponent},
    {path:"signupParent",component:SignupParentComponent},
    {path:"courseForm",component:CourseFormComponent , canActivate:[AuthGuardService]},
    {path:"teacherForm",component:TeacherFormComponent},
    {path:"addStudent",component:AddStudentComponent},
    {path:"editStudent/:id",component:EditStudentComponent},
    {path:"allCourses",component:CoursesComponent},
    {path:"allTeachers",component:TeachersComponent},
    {path:"allTeachers/search",component:TeachersComponent},
    {path:"allStudents",component:StudentsComponent},
    {path:"admin",component:AdminComponent , canActivate:[AuthGuardService]},
    {path:"courseInfo/:id",component:CourseInfoComponent},
    {path:"searchTeacher",component:SearchTeacherComponent},
    {path:"addCourse/:id/:teacherid",component:CourseFormComponent},
    {path:"editCourse/:id/:teacherid",component:CourseFormComponent},
    {path:"teacherInfo/:id",component:TeacherInfoComponent},
    {path:"editTeacher/:id",component:TeacherFormComponent},
    {path:"studentInfo/:id",component:StudentInfoComponent},
    {path:"studenForm",component:StudentFormComponent},
    {path:"affectationStudentCourses/:studentid",component:AffectationStudentCoursesComponent , canActivate:[AuthGuardService]},
    {path:"coursStudentsTable/:courseid",component:CoursStudentsTableComponent },
    {path:"dashboardTeacher",component:DashboardTeacherComponent , canActivate:[AuthGuardService]},
    {path:"evaluationTable/search",component:EvaluationTableComponent},
    {path:"addEvaluation/:teacherid" , component:AddEvalComponent},
    {path:"editEvaluation/:courseid/:studentid" , component:UpdateEvaluationComponent},

    {path:"editEvaluation/:teacherid" , component:AddEvalComponent},
    {path:"searchEvalChild" , component:SearchEvalChildComponent , canActivate:[AuthGuardService]},
    {path:"dashboardStudent",component:DashboardStudentComponent},
    {path:"dashboardParent",component:DashboardParentComponent},
    {path:"profile",component:ProfileComponent},
  ]}
 
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
