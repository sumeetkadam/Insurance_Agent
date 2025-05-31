import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormdataService } from 'src/app/services/formdata.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  receivedAgencyCode: string = '';
  enteredPassword: string = '';
  agencySubscription!: Subscription;
  agencyCode: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private formDataService: FormdataService) { }

  ngOnInit(): void {
    this.getAgencyCode();
    this.initializeForm();
    console.log('Agency Code:', this.agencyCode);
    this.loginForm.controls['enteredPassword'].valueChanges.subscribe(()=>{
      this.errorMessage ='';
    });
  }

  initializeForm():void{
    this.loginForm = this.fb.group({
      enteredPassword:['',Validators.required]
    });
  }

  getAgencyCode():void{
    this.agencySubscription = this.formDataService.currentData.subscribe((data)=>{
      if(data?.agencyCode){
        this.agencyCode =  data.agencyCode;
        console.log('Agency Code:', this.agencyCode);
      }
      else{
        console.log('No agency code available');
      }
    });
  }

  login() {
    const requestBody = {

      agencyCode: this.agencyCode,
      password: this.loginForm.value.enteredPassword
    };
    // Call authentication service method
    this.authService.validatePassword(requestBody).subscribe(
      (response: any) => {
        if (response.valid) {
          console.log('Login successful');
          this.router.navigate(['success']); // Navigate on success
        } else {

          this.errorMessage = 'Invalid credentials!';
        }
      },
      (error) => {
        this.errorMessage = 'Something went wrong. Please try again.';
      }
    );
  }
}
