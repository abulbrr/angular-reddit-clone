import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { RegisterRequestPayload } from './register-request.payload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm : FormGroup;
  registerRequestPayload: RegisterRequestPayload;

  
  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    
    this.registerRequestPayload = {
      username: '',
      email: '',
      password: ''
    };
    
  }
  
  register() {
    this.registerRequestPayload.email = this.registerForm.get("email")?.value;
    this.registerRequestPayload.password = this.registerForm.get("password")?.value;
    this.registerRequestPayload.username = this.registerForm.get("username")?.value;

    this.authService.register(this.registerRequestPayload).subscribe({
      next: () => console.log("Signup successful"),
      error: () => console.log("Signup failed")
    });
    }
}
