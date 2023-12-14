import { UserService } from './../../services/user.service';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm! : FormGroup;
  errorMessage:string='';
  constructor(private fb:FormBuilder,private userservice:UserService,private router:Router,private snackBar:MatSnackBar) {}
  
  ngOnInit()
  {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      role:['',Validators.required]

    });
  }

    onSubmit(){
      // handling login logic
      if (this.loginForm.valid) {
        const credentials = this.loginForm.value;
  
        this.userservice.login(credentials).subscribe(
          (response) => {
            // Authentication successful
            console.log(response);
            // Redirect or perform other actions upon successful login
            
            this.snackBar.open('You have successfully logged in!', 'Close', {
              duration: 3000, // 3000 milliseconds (3 seconds) duration for the snackbar
            });
            
            // Navigate to the categories component after a delay
            setTimeout(() => {
              this.router.navigate(['/categories']);
            }, 3000); // 3000 mi
          },
          (error) => {
            // Handle authentication error
            console.error(error);
  
            if (error.status === 401) {
              this.errorMessage = 'Invalid username or password';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
          }
        );
      } else {
        // Form is invalid,
        this.errorMessage = 'Please fill in all the required fields.';
      }
     
    }
  

}
