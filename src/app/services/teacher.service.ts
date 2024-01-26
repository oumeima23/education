import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  teacherUrl: string = "http://localhost:3000/teachers";
  
  constructor(private httpClient:HttpClient) { }


  //méthode du service pour envoyer l'obj tapé par l'utilisateur à la partie BE
addTeacher(obj) {
  return this.httpClient.post<{msg:string}>(this.teacherUrl, obj);
}

//request = récupérer tout le tableau d'objets
getAllTeachers() {
  return this.httpClient.get<{teachersTab:any}>(this.teacherUrl);
}

//request = récupérer un seul objet by Id
getTeacherById(id) {
  return this.httpClient.get<{findedTeacher:any}>(`${this.teacherUrl}/${id}`);
}

getTeacherInfos(id) {
  return this.httpClient.get<{findedTeacher:any}>(`${this.teacherUrl}/getTeacherInfos/${id}`);
}


//request = supprimer un objet by Id
deleteTeacher(id) {
  return this.httpClient.delete<{message:any}>(`${this.teacherUrl}/${id}`);
}

//request = modifier un objet
updateTeacher(obj) {
  return this.httpClient.put<{msg:string}>(this.teacherUrl, obj);
}

searchTeacher(obj) {
  return this.httpClient.post(`${this.teacherUrl}/search`, obj);
}

activateTeacher(id) {
  return this.httpClient.get<{message:any}>(`${this.teacherUrl}/activate/${id}`);
}

getEvaluations(id) {
  return this.httpClient.get<{evaluations:any}>(`${this.teacherUrl}/getEvaluations/${id}`);

}

getCourses(id)
{
  return this.httpClient.get<{coursesTab:any}>(`${this.teacherUrl}/myCourses/${id}`);

}

addEvaluation(obj)
{
  return this.httpClient.post(`${this.teacherUrl}/addEvaluation`, obj);

}

getEvaluation(courseId:string , studentId:string)
{
  return this.httpClient.get<{evaluation:any}>(`${this.teacherUrl}/getEvaluation/${courseId}/${studentId}`);

}

updateEvaluation(courseId:string , studentId:string , obj)
{
  return this.httpClient.put<{evaluation:any}>(`${this.teacherUrl}/updateEvaluation/${courseId}/${studentId}` ,obj);

}
}
