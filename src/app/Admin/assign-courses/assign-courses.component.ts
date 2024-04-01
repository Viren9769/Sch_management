import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ListDepartment } from '../../Interface/ListDepartment';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeDeparmentService } from '../../Services/type-deparment.service';
import { CourseService } from '../../Services/course.service';
import { ToastrService } from 'ngx-toastr';
import { validateForm } from '../../Helper/validateform';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../Services/user-service.service';

@Component({
  selector: 'app-assign-courses',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './assign-courses.component.html',
  styleUrl: './assign-courses.component.css'
})
export class AssignCoursesComponent implements OnInit {


  ListDepartment: ListDepartment[] = [];
  addUpForm!: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private typeDepartment : TypeDeparmentService,
    private courseservice : CourseService,
    private toaster : ToastrService,
    private userservice : UserServiceService
  ){}
  ngOnInit(): void {
    this.addUpForm = this.fb.group({
      Course_Name: ['', Validators.required],
      Faculty: ['', Validators.required],
      TimeDay: ['', Validators.required],
      Department: [this.getDefaultDepartmentId(), Validators.required]
    })

    this.typeDepartment.getDepartment().subscribe({
      next: (res) => {
        this.ListDepartment = res;
        console.log(this.ListDepartment);
       
      },
      error: (err) => {
        console.log(err);
      }
    })
   // console.log(this.ListDepartment);
  }

  getDefaultDepartmentId() {
    var dept_code = localStorage.getItem('dept_code');
    console.log('retrievedObject: ',dept_code);
    return dept_code; // Assuming '1' is the ID of the department you want to be selected by default
  }

  onAddup()
  {
    if(this.addUpForm.valid){
      console.log(this.addUpForm.value);
      this.addUpForm.value.Department = {department_ID: this.addUpForm.value.Department}
      this.courseservice.register(this.addUpForm.value)
.subscribe({
  next:(res: any)=>{
    console.log(res);
    this.toaster.success("Course Added");
    this.addUpForm.reset();
  },
  
  error: (err: any) => {
    console.error("Error occurred:", err);
   // alert(err?.error?.message || "An error occurred while registering.");
   this.toaster.error("signup failed");
  }
});
    } else {
      validateForm.validateAllFormFields(this.addUpForm);
      alert("Your form is invalid");
    }


    }
    logout()
  {
    this.userservice.SignOut();
    this.toaster.success("Logout Successfull");
  }
  }


