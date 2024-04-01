import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { ListDepartment } from '../../Interface/ListDepartment';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeDeparmentService } from '../../Services/type-deparment.service';
import { listType } from '../../Interface/ListType';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent implements OnInit{
 
 // public result: any = ""
 listType: listType[] = [];
  selectedOption?: string = "";
  public users: any = [];
ListDepartment: ListDepartment[] = [];
searchForm!: FormGroup;

  constructor( private userservice: UserServiceService, private toast: ToastrService, private api: ApiService, private fb: FormBuilder, private typeDepartment : TypeDeparmentService){}
  
    ngOnInit(){
     

     
  this.searchForm = this.fb.group({
    Department: ['', Validators.required],
    Type: ['', Validators.required]

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
      const dept_ID = {department_ID: this.searchForm.value.Department};
      const type_ID = {type_ID : this.searchForm.value.Type};
      
      //console.log("hello viren",this.searchForm.value.Department);
     // this.apiservice.getCourse(department.department_ID.toString())
     console.log("department name", dept_ID)
     console.log("selected type", type_ID)
     //console.log("Selected Role:", this.selectedOption);
     //console.log(this.api.getUsers);
      this.api.getUsers(dept_ID.department_ID.toString(), type_ID.type_ID.toString())
      
      .subscribe((res:any) => {
        this.users = res;
        console.log(res);
      });
    }
  }
  
    logout()
    {
      this.userservice.SignOut();
      this.toast.success("Logout Successfull");
    }

}

