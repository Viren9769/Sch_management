import { Component, OnInit } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { UserServiceService } from '../../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../Services/api.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent implements OnInit {

public users: any = [];

constructor( private userservice: UserServiceService, private toast: ToastrService, private api: ApiService){}

  ngOnInit(){
   this.getAllUsers();
  }
 
getAllUsers()
{
 // debugger;
  this.api.getUser().subscribe((res:any) => {
    this.users = res;
  },
  error => {
    alert("error From Api");
  }
  );
}

  logout()
  {
    this.userservice.SignOut();
    this.toast.success("Logout Successfull");
  }

}
