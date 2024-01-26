import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherCourseService {
teacherCourseUrl:string="http://localhost:3000/teachers"

  constructor(private HttpClient : HttpClient) {}

  addCourse(obj , teacherid:string) {
    const url = this.teacherCourseUrl +"/" + teacherid
    return this.HttpClient.post<{msg:any}>(url, obj);
  }
  //request = récupérer tout le tableau d'objets
getAllTeacherCourses(teacherId) {
  return this.HttpClient.get<{coursesTab:any}>(this.teacherCourseUrl+"/coursesByTeacher/"+teacherId);
}
deleteCourse(id) {
  return this.HttpClient.delete<{message:any}>(`${this.teacherCourseUrl}/${id}`);
}
}
