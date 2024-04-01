import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-faculty-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './faculty-dashboard.component.html',
  styleUrl: './faculty-dashboard.component.css'
})
export class FacultyDashboardComponent implements OnInit {
  constructor(private userservice: UserServiceService, private toast: ToastrService){}
  ngOnInit(): void {
   
  }
  logout()
  {
    this.userservice.SignOut();
    this.toast.success("Logout Successfull");
  }

}
