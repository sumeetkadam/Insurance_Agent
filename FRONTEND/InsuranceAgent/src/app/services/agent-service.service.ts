import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { agent } from '../agent';

@Injectable({
  providedIn: 'root'
})
export class AgentServiceService {
  private apiUrl = 'http://localhost:8086/agents'

  constructor(private http: HttpClient) { }
  getAllRole():Observable<agent[]>{
    return this.http.get<agent[]>(`${this.apiUrl}/getRoles`
    // ,{
    //   headers:{'Content-Type':'application/json'},
    //   withCredentials:true //enable credentials if necessary
    // }
    
    );
  }
}
