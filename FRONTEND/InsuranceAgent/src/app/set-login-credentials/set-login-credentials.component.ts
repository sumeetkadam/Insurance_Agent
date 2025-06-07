import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';
import { FormdataService } from '../services/formdata.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-login-credentials',
  templateUrl: './set-login-credentials.component.html',
  styleUrls: ['./set-login-credentials.component.css']
})
export class SetLoginCredentialsComponent implements OnInit {
  passwordForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  receivedAgencyCode: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private fb: FormBuilder, private passwordService: AuthService, private router: Router, private formDataService: FormdataService) { }

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
    this.subscribeToFormData()
  }
  onSubmit() {
    if (this.passwordForm.invalid) {
      this.errorMessage = "❌ Please enter a valid password.";
      return;
    }

    const { password, confirmPassword } = this.passwordForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = "❌ Passwords do not match.";
      return;
    }
    if (!this.receivedAgencyCode || this.receivedAgencyCode.trim() === '') {
      this.errorMessage = "❌ Agency Code is required.";
      return;
    }


    //✅ Ensure agencyCode is properly sent
    const requestBody = {
      agencyCode: this.receivedAgencyCode, //✅ Manually add agencyCode from service
      password,
      confirmPassword
    };

    console.log("🔄 Sending request:", requestBody); // Debugging log

    this.passwordService.setPassword(requestBody).subscribe({
      next: (response: any) => {
        this.successMessage = response.message;
        this.errorMessage = '';
        this.router.navigate(['/mpinSetup']);
      },
      error: (error) => {
        this.errorMessage = error.error?.error || "❌ Password validation failed.";
        this.successMessage = '';
      }
    });
  }
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  private subscribeToFormData(): void {
    this.formDataService.currentData.subscribe({
      next: (data) => {
        if (data?.agencyCode) {
          this.receivedAgencyCode = data.agencyCode;
          console.log('✅ Received Agency Code:', this.receivedAgencyCode);
        } else {
          console.error('❌ No agency code received! Data:', data);
        }
      },
      error: (err) => console.error('❌ Error receiving data:', err)
    });
  }
}
