import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormdataService } from '../services/formdata.service';

@Component({
  selector: 'app-mpin-setup',
  templateUrl: './mpin-setup.component.html',
  styleUrls: ['./mpin-setup.component.css'],
})
export class MpinSetupComponent implements OnInit {
  mpinForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showMpin: boolean = false;
  showConfirmMpin: boolean = false;
  confirmMpin: string = '';
  receivedAgencyCode: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private formDataService: FormdataService
  ) {}

  ngOnInit(): void {
    this.mpinForm = this.fb.group({
      mpin: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Only 4-digit numerical MPIN
      confirmMpin: ['', Validators.required],
    });
    this.mpinForm.controls['confirmMpin'].valueChanges.subscribe(() => {
      this.errorMessage = ''; // Clears the error when the user reenters the password
    });
    this.subscribeToFormData();
  }
  private subscribeToFormData(): void {
    this.formDataService.currentData.subscribe({
      next: (data) => {
        if (data?.agencyCode) {
          this.receivedAgencyCode = data.agencyCode;
          console.log('Received Agency Code:', this.receivedAgencyCode);
        } else {
          console.error('X No agency code received! Data:', data);
        }
      },
      error: (err) => console.error('X Error receiving data:', err),
    });
  }
  onSubmit() {
    const { mpin, confirmMpin } = this.mpinForm.value;
    if (!mpin || !confirmMpin) {
      this.errorMessage = 'XMPIN fields cannot be empty.';
      return;
    }
    if (mpin !== confirmMpin) {
      this.errorMessage = 'MPINS do not match.';
      return;
    }
    const requestBody = {
      agencyCode: this.receivedAgencyCode, //Manually add agency code from service
      mpin,
      confirmMpin,
    };
    console.log('sending request:', requestBody);
    this.authService.setMpin(requestBody).subscribe(
      (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.router.navigate(['/loginSuccess']);
      },
      (error) => {
        this.errorMessage = error.error?.error || 'failed to set MPIN';
        this.successMessage = '';
      }
    );
  }
}
