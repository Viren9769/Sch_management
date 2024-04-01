import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { ListDepartment } from '../../../Interface/ListDepartment';
import { TypeDeparmentService } from '../../../Services/type-deparment.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../Services/api.service';

@Component({
  selector: 'app-enroll-class',
  standalone: true,
  imports: [CommonModule,RouterLink,ReactiveFormsModule,FormsModule],
  templateUrl: './enroll-class.component.html',
  styleUrl: './enroll-class.component.css'
})
export class EnrollClassComponent implements OnInit {

  public courses: any = [];
ListDepartment: ListDepartment[] = [];
searchForm!: FormGroup;
constructor(
   private userservice: UserServiceService, 
   private toast: ToastrService,
   private typeDepartment : TypeDeparmentService ,
   private fb: FormBuilder, 
   private route: Router,
   private apiservice: ApiService
   ){}
ngOnInit(): void {

  this.searchForm = this.fb.group({
    Department: ['', Validators.required]
  })

  this.typeDepartment.getDepartment().subscribe({

    next: (res) => {
      this.ListDepartment = res;
      console.log(res)
    },
    error: (err) => {
      console.log(err);
    }
  })
  console.log("list Department",this.ListDepartment);
}

onSearch() {
  if(this.searchForm.valid)
  {
    console.log(this.searchForm.value);
    const department = {department_ID: this.searchForm.value.Department};
    //console.log("hello viren",this.searchForm.value.Department);
   // this.apiservice.getCourse(department.department_ID.toString())
    this.apiservice.getCourse(department.department_ID.toString())
    .subscribe((res:any) => {
      this.courses = res;
      console.log(res);
    });
  }
}

// onSearch() {
//   if(this.searchForm.valid) {
//     // Extract the selected department ID from the form
//     const departmentId = this.searchForm.value.Department;
//      console.log(departmentId);
//     // Adjust the form value to match the expected format for the API call
//     const requestData = {
//       department_ID: departmentId
//     };

//     // Call the API service's method to get the courses for the selected department
//     this.apiservice.getCourse(requestData.department_ID)
//       .subscribe((res: any) => {
//         this.courses = res;
//       });
//   }
// }
logout()
{
  this.userservice.SignOut();
  this.toast.success("Logout Successfull");
}

}
