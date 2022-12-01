import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { loginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isError: any;

  loginForm: FormGroup;
  loginRequest: loginRequestPayload;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.loginRequest = {
      username: '',
      password: '',
    };
  }

  login() {
    this.loginRequest.username = this.loginForm.get('username')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;

    this.authService.login(this.loginRequest).subscribe({
      next: () => console.log('login success'),
      error: () => console.log('error logging in'),
    });
  }
}
