import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseUrl: string = "http://localhost:3000/courses";
  
  constructor( private httpClient:HttpClient) { }

//méthode du service pour envoyer l'obj tapé par l'utilisateur à la partie BE
addCourse(obj , teacherid:string) {
  const url = this.courseUrl +"/add/" + teacherid
  return this.httpClient.post<{msg:any}>(url, obj);
}

//request = récupérer tout le tableau d'objets
getAllCourses() {
  return this.httpClient.get<{coursesTab:any}>(this.courseUrl);
}

//request = récupérer un seul objet by Id
getCourseById(id) {
  return this.httpClient.get<{findedCourse:any}>(`${this.courseUrl}/getCourseById/${id}`);
}

//request = supprimer un objet by Id
deleteCourse(id) {
  return this.httpClient.delete<{message:any}>(`${this.courseUrl}/${id}`);
}

//request = modifier un objet
updateCourse(obj) {
  return this.httpClient.put<{msg:string}>(this.courseUrl ,obj);
}

searchCourse(obj) {
  return this.httpClient.post(`${this.courseUrl}/search`, obj);
}

getAvailableCourses()
{
  const url = this.courseUrl + "/getAvailableCourses"
  return this.httpClient.get<{coursesTab:any}>(url);

}

getStudentsByCourse(courseId:string)
{
  const url = this.courseUrl + "/getStudentsByCourse/"+ courseId ;
  return this.httpClient.get<{studentTab:any}>(url);
}

}
