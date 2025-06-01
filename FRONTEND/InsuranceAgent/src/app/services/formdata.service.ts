import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormdataService {
   private formData = new BehaviorSubject<any>(null);
   currentData = this.formData.asObservable();

   updateFormData(data: any){
    this.formData.next(data);
   }
}
