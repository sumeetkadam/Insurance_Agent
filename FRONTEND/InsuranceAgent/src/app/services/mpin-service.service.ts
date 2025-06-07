import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MpinServiceService {
  private baseUrl = 'http://localhost:8086/auth';

  constructor(private http : HttpClient) { }

  setMpin(mpin:string, confirmMpin: string){
    return this.http.post(`${this.baseUrl}/set-mpin`,{mpin,confirmMpin});
  }
}
