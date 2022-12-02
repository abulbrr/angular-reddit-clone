import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { loginRequestPayload } from './login-request.payload';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isError: any;

  loginForm: FormGroup;
  loginRequest: loginRequestPayload;

  registerSuccessMessage: string | undefined;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.loginRequest = {
      username: '',
      password: '',
    };

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['registered'] === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage =
          'Please Check your inbox for activation email ' +
          'activate your account before you Login!';
      }
    });
  }

  login() {
    this.loginRequest.username = this.loginForm.get('username')?.value;
    this.loginRequest.password = this.loginForm.get('password')?.value;
    this.authService.login(this.loginRequest).subscribe({
      next: () => {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successful');
      },
      error: () => (this.isError = true),
    });
  }
}
