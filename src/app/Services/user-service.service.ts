import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl: string = "https://localhost:44355/api/User/"
  constructor(private http: HttpClient, private route: Router) { }

   register(userobj: any): Observable<any>{
     return this.http.post<any>(`${this.baseUrl}register`,userobj)
   }
  
  
  login(loginobj: any){
    return this.http.post<any>(`${this.baseUrl}verify`,loginobj)
  }

 

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
    console.log("Store Token",tokenValue);
  }

 getToken(){
  console.log("getTken",localStorage.getItem('token'));
  return localStorage.getItem('token');
}
  isLoggedIn():boolean{
    return !!localStorage.getItem('token')
  }

  SignOut(){
    localStorage.clear();
    this.route.navigate(['login']);
  }


  
  }

