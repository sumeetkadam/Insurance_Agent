import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentServiceService } from '../services/agent-service.service';
import { FormdataService } from '../services/formdata.service';
import { OtpServiceService } from '../services/otp-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})
export class RoleDetailsComponent implements OnInit {
  identityForm!: FormGroup;
  validationSuccessMessage ='';
  validationFailedMessage = '';
  otpMessage = '';
  agents:any[]=[];
  private receivedAgencyCode:string = '';

  constructor(
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private agentService: AgentServiceService,
    private router: Router,
    private formDataService: FormdataService,
    private otp: OtpServiceService

  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.fetchRoles();
    this.subscribeToFormData();
  }


private initializeForm(): void {
  this.identityForm = this.fb.group({ 
    agencyCode: ['', Validators.required],
    consentGiven: [false, Validators.requiredTrue]
  });
  }

  private fetchRoles (): void {
  this.agentService.getAllRole().subscribe({ 
    next: (data) => {
  this.agents = data;
  console.log('Agents received:', this.agents);
    },
  error: (err) => console.error('❌ Error fetching roles:', err)
  });
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

  validateAgencyCode(): void {
  const agencyCodeInput = this.identityForm.controls['agencyCode'].value?.trim();
  if (agencyCodeInput === this.receivedAgencyCode?.trim()) {
    this.validationSuccessMessage ='✅ Valid agency Code.';
  this.requestOTP();
  }
  else{
    this.validationFailedMessage = '❌ Invalid agency code.';
    this.identityForm.controls['agencyCode'].setValue('');
  }
}
private requestOTP():void{
  if(this.identityForm.invalid) return;

  const agencyCodeToSend = this.receivedAgencyCode || this. identityForm.value.agencyCode;
  if(!agencyCodeToSend){
    console.error('❌ Agency code is mising in request!');
    return;
  }

  console.log('🔄 Sending OTP request for Agency Codes: ',agencyCodeToSend);
  this.otp.requestOtp(agencyCodeToSend).subscribe({
    next:(response)=>{
      console.log('✅ OTP Generated:',response);
      this.otpMessage = '✅ OTP Generated successfully!';
      setTimeout(()=>this.router.navigate(['generateOTP']),1000);
    },
    error:(error)=>{
      console.log('❌ OTP Generation Error:', error);
      this.otpMessage = '❌ Failed to generate OTP';
    }
  });
}
}

