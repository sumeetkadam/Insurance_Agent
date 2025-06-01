import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtpServiceService {

  private baseUrl = 'http://localhost:8086/otp';

  constructor(private http:HttpClient) { }

  requestOtp(agencyCode:string){
    return this.http.post(`${this.baseUrl}/generate`,{agencyCode:agencyCode});
  }

  validateOtp(agencyCode:string, enteredOtp:string){
    return this.http.post(`${this.baseUrl}/validate`,{agencyCode, enteredOtp});
  }
}
