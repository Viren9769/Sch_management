import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from "./Component/User/home/home.component";
import { NavbarComponent } from "./Component/User/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
//import { provideHttpClient, withInterceptors } from '@angular/common/http';
//import { tokenInterceptor } from './interceptor/token.interceptor';
//import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import {  interceptorToken } from './interceptors/token.interceptor';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HomeComponent, NavbarComponent,FormsModule],
  //  providers:[provideHttpClient(withInterceptors([tokenInterceptor]))]
  
})
export class AppComponent {
  title = 'Sch_Management';
}
