import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestPayload } from '../register/register-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  register(registerRequestPayload: RegisterRequestPayload) {
    return this.httpClient.post('http://localhost:8080/api/v1/auth/register', registerRequestPayload);
  }
}
