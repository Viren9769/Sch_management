import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeDeparmentService {

  private baseURL: string = "https://localhost:44355/api/TypeDepartment/";
  constructor(private http: HttpClient) { }

  getType(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}Type`);
  }

  getDepartment(): Observable<any>{
    return this.http.get<any>(`${this.baseURL}Department`);
  }



}
