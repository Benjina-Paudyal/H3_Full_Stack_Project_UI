import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private fb:FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      Firstname:['',Validators.required],
      Lastname:['',Validators.required],
      Username:['',Validators.required],
      Password:['',Validators.required],
      ConfirmPassword:['',Validators.required]
    });
  }

  onSubmit(){
    // handle the registration
    if(this.registrationForm.valid) {
      console.log(this.registrationForm.value);
    }
    else
    {
      //Form is invalid, handle error message 
    }
  }

}
