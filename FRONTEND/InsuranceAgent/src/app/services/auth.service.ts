import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basUrl = 'http://localhost:8086/auth';

  constructor(private http: HttpClient) { }

  setPassword(requestBody: { agencyCode: string; password: string; confirmPassword: string }) {
    return this.http.post(`${this.basUrl}/set-password`, requestBody);
  }

  validatePassword(requestBody: { agencyCode: string; password: string }) {
    return this.http.post(`${this.basUrl}/validate-password`, requestBody);
  }

  setMpin(requestBody: { agencyCode: string; mpin: string; confirmMpin: string }) {
    return this.http.post(`${this.basUrl}/set-mpin`, requestBody);
  }

  validateMpin(requestBody: { agencyCode: string; mpin: string }) {
    return this.http.post(`${this.basUrl}/validate-mpin`, requestBody);
  }

}
