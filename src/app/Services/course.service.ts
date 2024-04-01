import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ListCourse } from '../Interface/ListCourse';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

 public token: string  ="";
  private baseUrl: string = "https://localhost:44355/api/Course/"
  constructor(private http: HttpClient, private route: Router) { 
   this.token =  localStorage.getItem('token') ?? "";
  }



    register(userobj: any): Observable<any>{
      console.log("userobj",userobj);
      const tok =  JSON.parse(atob(this.token?.split('.')[1]));
      console.log("claim",tok[""]);
      userobj['Department']['department_ID'] = tok['Department']
      return this.http.post<any>(`${this.baseUrl}register_course`,userobj)
    }

getcourses(departmentId : any){
  return this.http.get<ListCourse[]>(`${this.baseUrl}Courses${departmentId}`)
}

getUsers(course : string)
{
  const params = new HttpParams()
  .set('course', course)
 
  return this.http.get<any>(`${this.baseUrl}CourseName${params}`)
}




}
