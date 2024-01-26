import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { BlogComponent } from './components/blog/blog.component';
import { SubscribeComponent } from './components/subscribe/subscribe.component';
import { WelcomeServicesComponent } from './components/welcome-services/welcome-services.component';
import { WelcomeSchoolComponent } from './components/welcome-school/welcome-school.component';
import { FeedbackParentsComponent } from './components/feedback-parents/feedback-parents.component';
import { InfoComponent } from './components/info/info.component';
import { BestTeachersComponent } from './components/best-teachers/best-teachers.component';
import { CourseComponent } from './components/course/course.component';
import { LoginComponent } from './components/login/login.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupStudentComponent } from './components/signup-student/signup-student.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { KidsComponent } from './components/kids/kids.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsComponent } from './components/students/students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { ParentsTableComponent } from './components/parents-table/parents-table.component';
import { SignupComponent } from './components/signup/signup.component';
import { BannerComponent } from './components/banner/banner.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { SearchTeacherComponent } from './components/search-teacher/search-teacher.component';
import { CustomFilterPipe } from './pipes/custom-filter.pipe';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { DashboardTeacherComponent } from './components/dashboard-teacher/dashboard-teacher.component';
import { EvaluationTableComponent } from './components/evaluation-table/evaluation-table.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TeacherCoursesTableComponent } from './components/teacher-courses-table/teacher-courses-table.component';
import { AffectationStudentCoursesComponent } from './components/affectation-student-courses/affectation-student-courses.component';
import { CoursStudentsTableComponent } from './components/cours-students-table/cours-students-table.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { AddEvalComponent } from './components/add-eval/add-eval.component';
import { SearchEvalChildComponent } from './components/search-eval-child/search-eval-child.component';
import { LayoutComponent } from './components/layout/layout.component';
import { UpdateEvaluationComponent } from './components/update-evaluation/update-evaluation.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CoursesComponent,
    TeachersComponent,
    BlogComponent,
    SubscribeComponent,
    WelcomeServicesComponent,
    WelcomeSchoolComponent,
    FeedbackParentsComponent,
    InfoComponent,
    BestTeachersComponent,
    CourseComponent,
    LoginComponent,
    SignupTeacherComponent,
    SignupStudentComponent,
    SignupParentComponent,
    KidsComponent,
    CourseFormComponent,
    TeacherFormComponent,
    AddStudentComponent,
    EditStudentComponent,
    StudentsComponent,
    AdminComponent,
    CoursesTableComponent,
    TeachersTableComponent,
    StudentsTableComponent,
    ParentsTableComponent,
    SignupComponent,
    BannerComponent,
    CourseInfoComponent,
    SearchTeacherComponent,
    CustomFilterPipe,
    TeacherInfoComponent,
    StudentInfoComponent,
    StudentFormComponent,
    DashboardTeacherComponent,
    EvaluationTableComponent,
    DashboardParentComponent,
    TeacherCoursesTableComponent,
    AffectationStudentCoursesComponent,
    CoursStudentsTableComponent,
    DashboardStudentComponent,
    AddEvalComponent,
    SearchEvalChildComponent,
    LayoutComponent,
    UpdateEvaluationComponent,
    ProfileComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
