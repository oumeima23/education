import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private  isLogguedInSubject :BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false) ;
  isLogguedIn$ : Observable<boolean> = this.isLogguedInSubject.asObservable() ;
userUrl:string="http://localhost:3000/users"
  constructor( private httpClient:HttpClient) { }

  signup(user){
  return  this.httpClient.post<{msg:any}>(`${this.userUrl}/signup`,user);
  }

 

  login(data){
    return  this.httpClient.post<{msg:boolean,token:string,role:string  , id:string}>(`${this.userUrl}/login`,data);
    }
    signupStudent(user:any,img:File){
      let fData=new FormData();
      fData.append("firstName",user.firstName);
      fData.append("lastName",user.lastName);
      fData.append("email",user.email);
      fData.append("password",user.password);
      fData.append("tel",user.tel);
      fData.append("adress",user.adress);
      fData.append("role",user.role);
      fData.append("img",img);
      return  this.httpClient.post(`${this.userUrl}/signupStudent`,fData);
      }
     
      setLogguedIn(value:boolean):void
      {
          this.isLogguedInSubject.next(value) ;
      }
        }

