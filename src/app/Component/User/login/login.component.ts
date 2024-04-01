import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { validateForm } from '../../../Helper/validateform';
import { UserServiceService } from '../../../Services/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

selectedOption?: string = "";
type: string ="password";
isText: boolean = false;
eyeIcon: string ="fa-eye-slash";
loginForm!: FormGroup;
  constructor(private fb : FormBuilder,
    private userservice: UserServiceService,
    private router: Router,
    private toaster: ToastrService){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['MisAdmin@123',Validators.required],
     role: ['', Validators.required]
    })
  }

  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text":this.type = "password";
    }

    

    onSubmit(){
      if(this.loginForm.valid){

        console.log(this.loginForm.value)

        this.userservice.login(this.loginForm.value)
        .subscribe({
          next:(res)=> {
           // alert(res.message)
           this.loginForm.reset();
           this.userservice.storeToken(res.token);



           const helper = new JwtHelperService();

           const decodedToken = helper.decodeToken(res.token);
           
           
           // Other functions
           const expirationDate = helper.getTokenExpirationDate(res.token);
           const isExpired = helper.isTokenExpired(res.token);

           console.log("decodedToken", decodedToken);
           localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
           localStorage.setItem('dept_code', decodedToken.Department);
           
         
           console.log("Selected Role:", this.selectedOption);

           switch (this.selectedOption) {
            case 'Faculty':
              
              this.router.navigate(['faculty']);
              break;
            case 'Student':
              this.router.navigate(['student']);
              break;
            case 'Admin':
              this.router.navigate(['admin']);
              break;
            default:
              // Handle invalid selection
              break;
          }
            
            
           // this.router.navigate(['student']);
          },
          error:(err)=>{
           // alert(err?.error.message)
           this.toaster.error("login Failed");
           
          }
        })

      }
      else
      {
     console.log("form is not valid")
      
     validateForm.validateAllFormFields(this.loginForm);

     alert("your form is invalid");

      }
    }
    // selectedOption(role: string): void {
    //   switch (role) {
    //     case 'Faculty':
    //       this.router.navigate(['faculty']); // Assuming 'faculty' is the route for the faculty page
    //       break;
    //     case 'Student':
    //       this.router.navigate(['student']); // Assuming 'student' is the route for the student page
    //       break;
    //     case 'Admin':
    //       this.router.navigate(['admin']); // Assuming 'admin' is the route for the admin page
    //       break;
    //     default:
    //       // Handle invalid selection
    //       break;
    //   }
    // }

    // getDecodedAccessToken(token: string): any {
    //   try {
    //     return jwt_decode(token);
    //   } catch (error) {
    //     return null;
    //   }
    // }

    
}

