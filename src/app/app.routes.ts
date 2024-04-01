import { Routes } from '@angular/router';
import { HomeComponent } from './Component/User/home/home.component';
import { LoginComponent } from './Component/User/login/login.component';
import { SignupComponent } from './Component/User/signup/signup.component';
import { PageNotFoundComponent } from './Component/User/page-not-found/page-not-found.component';
import { StudentDashboardComponent } from './Component/User/student-dashboard/student-dashboard.component';
import { authGuard } from './guards/auth.guard';
import { FacultyDashboardComponent } from './Component/User/faculty-dashboard/faculty-dashboard.component';
import { AdminDashboardComponent } from './Component/User/admin-dashboard/admin-dashboard.component';
import { ViewClassComponent } from './Component/Course/view-class/view-class.component';
import { EnrollClassComponent } from './Component/Course/enroll-class/enroll-class.component';
import { AssignCoursesComponent } from './Admin/assign-courses/assign-courses.component';
import { ViewUsersComponent } from './Admin/view-users/view-users.component';
import { ViewCoursesComponent } from './Admin/view-courses/view-courses.component';

export const routes: Routes = [

    {'path': '', 'title': 'Home', component:HomeComponent},
    {'path':'login', 'title': 'login', component:LoginComponent},
    {'path':'signup', 'title': 'signup', component:SignupComponent},
    {'path':'student', 'title':'student', component:StudentDashboardComponent,canActivate:[authGuard]},
    {'path':'faculty', 'title':'faculty', component:FacultyDashboardComponent,canActivate:[authGuard]},
    {'path':'admin', 'title':'admin', component:AdminDashboardComponent,canActivate:[authGuard]},
    {'path':'view', 'title':'view', component:ViewClassComponent,canActivate:[authGuard]},
    {'path':'enroll', 'title':'enroll', component:EnrollClassComponent,canActivate:[authGuard]},
    {'path':'assign', 'title':'assign', component:AssignCoursesComponent,canActivate:[authGuard]},
    {'path':'view_courses', 'title':'view_courses', component:ViewCoursesComponent,canActivate:[authGuard]},
    {'path':'view_users', 'title':'view_users', component:ViewUsersComponent,canActivate:[authGuard]},
     
     




    {'path':'**', 'title': 'error', component:PageNotFoundComponent}
];
