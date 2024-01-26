import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentInfo } from '../models/studentInfo';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  studentUrl: string = "http://localhost:3000/students";
  constructor(private httpClient:HttpClient) { }

  //méthode du service pour envoyer l'obj tapé par l'utilisateur à la partie BE
addStudent(obj) {
  return this.httpClient.post<{msg:any}>(this.studentUrl, obj);
}

//request = récupérer tout le tableau d'objets
getAllStudents() {
  return this.httpClient.get<any>(this.studentUrl);
}

//request = récupérer un seul objet by Id
getStudentById(id) {
  return this.httpClient.get<{findedStudent:any}>(`${this.studentUrl}/${id}`);
}

//request = supprimer un objet by Id
deleteStudent(id) {
  return this.httpClient.delete<{message:any}>(`${this.studentUrl}/${id}`);
}

//request = modifier un objet
updateStudent(obj) {
  return this.httpClient.put<{msg:string}>(this.studentUrl ,obj);
}

searchStudent(obj) {
  return this.httpClient.post(`${this.studentUrl}/search`, obj);
}

affectCourse(studentid:string ,obj) {
  return this.httpClient.post(`${this.studentUrl}/affectCourse/${studentid}`, obj);

}

getStudientsByCourse(courseId:string)
{
  return this.httpClient.get<{studentTab:any}>(`${this.studentUrl}/getByCourse/${courseId}`);

}

getStudentEvals(userId)
{
  return this.httpClient.get<{studentEvals:any}>(`${this.studentUrl}/dashboard/${userId}`);

}

}
