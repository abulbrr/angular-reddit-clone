import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestPayload } from '../register/register-request.payload';
import { loginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-respone.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  register(registerRequestPayload: RegisterRequestPayload) {
    return this.httpClient.post(
      'http://localhost:8080/api/v1/auth/register',
      registerRequestPayload
    );
  }

  login(loginRequestPayload: loginRequestPayload) {
    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/v1/auth/login',
        loginRequestPayload
      )
      .pipe(
        map((reponse) => {
          this.localStorageService.store(
            'authenticationToken',
            reponse.authenticationToken
          );
          this.localStorageService.store('refreshToken', reponse.refreshToken);
          this.localStorageService.store('username', reponse.username);
          this.localStorageService.store('expiresAt', reponse.expiresAt);
          return true;
        })
      );
  }

  refreshToken() {
    const refreshTokenPayload = {
      refreshToken: this.getRefreshToken(),
      username: this.getUserName(),
    };

    return this.httpClient
      .post<LoginResponse>(
        'http://localhost:8080/api/v1/auth/refresh/token',
        refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorageService.store(
            'authenticationToken',
            response.authenticationToken
          );

          this.localStorageService.store('expiresAt', response.expiresAt);
        })
      );
  }

  getJwtToken() {
    this.localStorageService.retrieve('authenticationToken');
  }

  getRefreshToken() {
    return this.localStorageService.retrieve('refreshToken');
  }

  getUserName() {
    return this.localStorageService.retrieve('username');
  }

  getExpirationTime() {
    return this.localStorageService.retrieve('expiresAt');
  }
}
