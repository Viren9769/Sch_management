import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateForm } from '../../../Helper/validateform';
import { UserServiceService } from '../../../Services/user-service.service';
import { TypeDeparmentService } from '../../../Services/type-deparment.service';
import { listType } from '../../../Interface/ListType';
import { ListDepartment } from '../../../Interface/ListDepartment';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
 
listType: listType[] = [];
ListDepartment: ListDepartment[] = [];
type: string = "password";
isText: boolean =false;
eyeIcon: string = " fa-eye-slash";
signUpForm!: FormGroup;

constructor(private fb: FormBuilder,
  private userservice: UserServiceService,
  private typeDepartment: TypeDeparmentService,
  private router: Router,
  private Toaster: ToastrService){}

  ngOnInit(): void {
this.signUpForm = this.fb.group({
  FirstName: ['', Validators.required],
  LastName: ['', Validators.required],
  Email: ['', Validators.required],
  phone: ['', Validators.required],
  Address: ['', Validators.required],
  Password: ['', Validators.required],
  Department: ['', Validators.required],
  Type: ['', Validators.required]
})

this.typeDepartment.getType().subscribe({
 
  next: (res) => {
    console.log("welcome");
    this.listType = res;
    
    console.log(res);
  },
  error: (err) => {
    console.log(err);
  }
});

this.typeDepartment.getDepartment().subscribe({

  next: (res) => {
    this.ListDepartment = res;
    console.log(res)
  },
  error: (err) => {
    console.log(err);
  }
})

  }

  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text":this.type = "password";
    }

  onSignup() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.signUpForm.value.Type = {type_ID: this.signUpForm.value.Type} // type:{ type_ID : value}
      this.signUpForm.value.Department = {department_ID: this.signUpForm.value.Department}
      this.userservice.register(this.signUpForm.value)
        .subscribe({
          next: (res: any) => {
            console.log("Welcome to register", res);
           // alert(res.message);
this.Toaster.success("Signup Successfull");
            this.signUpForm.reset();
            this.router.navigate(['login']);
          },
          error: (err: any) => {
            console.error("Error occurred:", err);
           // alert(err?.error?.message || "An error occurred while registering.");
           this.Toaster.error("signup failed");
          }
        });
    } else {
      validateForm.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid");
    }
  }

  }

