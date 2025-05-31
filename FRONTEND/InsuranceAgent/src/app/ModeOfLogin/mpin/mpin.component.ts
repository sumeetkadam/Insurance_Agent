import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FormdataService } from 'src/app/services/formdata.service';

@Component({
  selector: 'app-mpin',
  templateUrl: './mpin.component.html',
  styleUrls: ['./mpin.component.css']
})
export class MpinComponent implements OnInit {
  loginFormMpin!: FormGroup;
  errorMessage: string = '';
  receivedAgencyCode: string = '';
  enteredMpin: string = '';
  agencySubscription!: Subscription;
  agencyCode: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private formDataService: FormdataService) { }

  ngOnInit(): void {
    this.getAgencyCode();
    this.initializeForm();
    console.log('Agency Code:', this.agencyCode); //debugging
    this.loginFormMpin.controls['enteredMpin'].valueChanges.subscribe(() => {
      this.errorMessage = ''; //clears the error when the user reenters the password
    });
  }

  initializeForm(): void {

    this.loginFormMpin = this.fb.group({
      enteredMpin: ['', Validators.required]
    });
  }

  getAgencyCode(): void {
    this.agencySubscription = this.formDataService.currentData.subscribe((data) => {
      if (data?.agencyCode) {
        this.agencyCode = data.agencyCode;
        console.log(' Agency Code:', this.agencyCode); // Debugging 
      } else {
        console.error('X No agency code available');
      }
    });
  }

  login() {
    const requestBody = {

      agencyCode: this.agencyCode,
      mpin: this.loginFormMpin.value.enteredMpin
    };
    // Call authentication service method
    this.authService.validateMpin(requestBody).subscribe(
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
