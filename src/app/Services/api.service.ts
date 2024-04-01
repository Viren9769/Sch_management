import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = 'https://localhost:44355/api/';//private courseURL: string = "";

  constructor(private http : HttpClient) { }

getUser():Observable<any>{
  return this.http.get<any>(this.baseURL);
}

// getAllUser(departmentId: any): Observable<any> {
//   // Your existing code to fetch users, now using departmentId
// }

getUsers(departmentId: string, type: string): Observable<any> {
  // Construct the URL with query parameters using HttpParams
  const params = new HttpParams()
    .set('departmentId', departmentId)
    .set('type', type);

  return this.http.get<any>(`${this.baseURL}User/getUsersByDeptAndType`, { params });
}

getCourse(id: string):Observable<any>{
return this.http.get<any>(`https://localhost:44355/api/Course/getCourse${id}`);
}

}
