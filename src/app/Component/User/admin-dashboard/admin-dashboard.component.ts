import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  constructor(private userservice: UserServiceService, private toast: ToastrService){}
  ngOnInit(): void {
   
  }
  logout()
  {
    this.userservice.SignOut();
    this.toast.success("Logout Successfull");
  }

}
