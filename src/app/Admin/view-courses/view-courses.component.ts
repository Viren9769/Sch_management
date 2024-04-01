import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../Services/api.service';
import { UserServiceService } from '../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeDeparmentService } from '../../Services/type-deparment.service';
import { ListDepartment } from '../../Interface/ListDepartment';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../Services/course.service';
import { ListCourse } from '../../Interface/ListCourse';

@Component({
  selector: 'app-view-courses',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,CommonModule],
  templateUrl: './view-courses.component.html',
  styleUrl: './view-courses.component.css'
})
export class ViewCoursesComponent implements OnInit {

  
 // public courses : any = [];
  userForm! : FormGroup;
  ListDepartment: ListDepartment[] = [];
  public users: any;
  ListCourse: ListCourse[] = [];

  constructor( 
   private userservice: UserServiceService,
   private toast: ToastrService, 
   private api: ApiService,
   private fb: FormBuilder, 
   private typeDepartment : TypeDeparmentService,
   private courseservice : CourseService
   ){}

  
  ngOnInit(): void {
 
    this.userForm = this.fb.group({
      Department :['',Validators.required],
      Courses : ['',Validators.required]
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
    console.log("list Department",this.ListDepartment);
    
  //   this.courseservice.getcourses(dept_ID)
  // .subscribe({
  //   next: (course) => {
  //     this.ListCourse = course; // Corrected variable name to match case
  //     console.log(course);
  //   },
  //   error: (err) => {
  //     console.error(err);
  //   }
  // });

  
  }

  autoSubmit()
  {
    if(this.userForm.valid)
    {
      console.log("hello",this.userForm.value);
     const dept_ID = {dept_ID: this.userForm.value.Department};
      console.log("Course Name = ", dept_ID );
    
      this.courseservice.getcourses(dept_ID)
      .subscribe((res:any) => {
            this.users = res;
             console.log(res);
            });
    }
  }
 
onSubmit()
 {
if(this.userForm.valid)
{
  console.log("hello",this.userForm.value);
  const course_name = this.userForm.value.course;
  console.log("Course Name = ", course_name);

  this.courseservice.getUsers(course_name)
  .subscribe((res:any) => {
        this.users = res;
         console.log(res);
        });
}

// "Http failure response for https://localhost:44355/api/Course/CourseNamecourse=%5Bobject%20Object%5D: 404 OK"


//   if(this.searchForm.valid)
//   {
//     console.log(this.searchForm.value);
//     const dept_ID = {department_ID: this.searchForm.value.Department};
//     const type_ID = {type_ID : this.searchForm.value.Type};
    
//     //console.log("hello viren",this.searchForm.value.Department);
//    // this.apiservice.getCourse(department.department_ID.toString())
//    console.log("department name", dept_ID)
//    console.log("selected type", type_ID)
//    //console.log("Selected Role:", this.selectedOption);
//    //console.log(this.api.getUsers);
//     this.api.getUsers(dept_ID.department_ID.toString(), type_ID.type_ID.toString())
    
//     .subscribe((res:any) => {
//       this.users = res;
//       console.log(res);
//     });
//   }

}
   
logout()
{
  this.userservice.SignOut();
  this.toast.success("Logout Successfull");
}


}
