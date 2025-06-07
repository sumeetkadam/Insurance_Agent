import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OtpServiceService } from '../services/otp-service.service';
import { Router } from '@angular/router';
import { FormdataService } from '../services/formdata.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  agencyCode:string='';
  errorMessage:string ='';
  successMessage:string='';
  errorOtpMessage:string='';
  resendAttempts:number =0;
  disableResend:boolean= false;
  wrongOtp:boolean =false;
  timeLeft:number=10;
  otpValidation!:FormGroup;
  timerInterval!:any;
  agencySubscription!:Subscription;

  constructor( private otpService: OtpServiceService,
    private fb: FormBuilder,
    private formDataService: FormdataService,
    private router : Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAgencyCode();
  }

  initializeForm():void{
    this.otpValidation = this.fb.group({
      agencyCode:['',Validators.required],
      enteredOtp:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]],
    });
  }

  getAgencyCode():void{
    this.agencySubscription = this.formDataService.currentData.subscribe((data)=>{
      if(data?.agencyCode){
        this.agencyCode = data.agencyCode;
        console.log('✅ Agency Code for OTP Validation :', this.agencyCode);
        this.otpValidation.patchValue({agencyCode:this.agencyCode});
      }
      else{
        console.error('❌ No agency code available for OTP validation');
      }
    });
  }

  requestOtp():void{
    const agencyCode = this.otpValidation.controls?.['agencyCode']?.value?.trim();
    if(!agencyCode){
      console.error('❌ Agency code is missing in request! Check form binding.');
      this.errorMessage = '❌ Please enter the agency code';
      return;
    }
    console.log('Sending OTP Request for Agency Code:', agencyCode);

    this.otpService.requestOtp(agencyCode).subscribe(
      (response)=>{
        console.log('✅ OTP Generated Successfully:', response);
      },
      (error)=>{
        console.error('❌ OTP generation Failed:',error);
        this.errorMessage = error?.error?.message || '❌ Failed to generate OTP, try again later';
      }
    );
  }

  validateOtp():void{
    if(!this.otpValidation){
      console.error("❌ Form is not initialized!");
      this.errorMessage = "❌ Form is not initialized, please check binding!"
      return;
    }

    const agencyCode = this.otpValidation.controls?.['agencyCode']?.value?.trim();
    const enteredOtp = this.otpValidation.controls?.['enteredOtp']?.value?.trim();

    if(!agencyCode || !enteredOtp){
      this.errorMessage = '❌ Please enter both agency code and OTP';
      console.error('❌ Missing Agency Code or OTP in request!');
      return;
    }
    console.log('Sending OTP Validation Request:',{agencyCode, enteredOtp});

    this.otpService.validateOtp(agencyCode,enteredOtp).subscribe(
      (response:any)=>{
        console.log('✅ OTP Verified Successfully:',response);
        this.successMessage = response.message;
        this.signUpSuccess();
      },
      (error:any)=>{
        console.error('❌ OTP Validation Error:',error);
        this.errorOtpMessage = error?.error?.message || '❌ Incorrect OTP, please try again.';
        this.otpValidation.controls?.['enteredOtp']?.setValue('');
        this.wrongOtp = true;
        this.startTimer();
      }
    );
  }

  resendOtp():void{
    if(this.resendAttempts < 2){
      this.resendAttempts++;
      this.requestOtp();
      this.disableResend =  true;
      setTimeout(()=>(this.disableResend = false),5*60*1000);
    }
    else{
      this.errorMessage ='⚠️ Maximum resend attempts reached.';
    }
  }
  startTimer():void{
    this.timeLeft = 10;
    clearInterval(this.timerInterval);

    this.timerInterval = setInterval(()=>{
      if(this.timeLeft > 0){
        this.timeLeft--;
      }
      else{
        clearInterval(this.timerInterval);
        this.wrongOtp = false;
        this.resendOtp();
      }
    },1000);
  }

  signUpSuccess():void{
    this.router.navigate(['/setUpAccount']);
  }
  ngOnDestroy():void{
    if(this.agencySubscription){
      this.agencySubscription.unsubscribe();
    }
    clearInterval(this.timerInterval);
  }
}