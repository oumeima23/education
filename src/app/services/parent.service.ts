import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  parentUrl: string = "http://localhost:3000/parents";
  constructor(private httpClient:HttpClient ) { }

    //méthode du service pour envoyer l'obj tapé par l'utilisateur à la partie BE
addParent(data) {
  return this.httpClient.post<{msg:any}>(this.parentUrl, data);
}

//request = récupérer tout le tableau d'objets
getAllParents() {
  const url =this.parentUrl + "/getAll";
  return this.httpClient.get<{parentsTab:any}>(url);
}

//request = récupérer un seul objet by Id
getParentById(id) {
  return this.httpClient.get<{findedParent:any}>(`${this.parentUrl}/${id}`);
}

//request = supprimer un objet by Id
deleteParent(id) {
  return this.httpClient.delete<{message:any}>(`${this.parentUrl}/${id}`);
}

//request = modifier un objet
updateParent(obj) {
  return this.httpClient.put<{msg:string}>(this.parentUrl, obj);
}

searchChildEvals(obj) {
  return this.httpClient.post<{childEvals:any}>(`${this.parentUrl}/search`, obj);
}
}
