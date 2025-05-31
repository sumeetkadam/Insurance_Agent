import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseLoginMethodComponent } from './choose-login-method/choose-login-method.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { MpinSetupComponent } from './mpin-setup/mpin-setup.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { SetLoginCredentialsComponent } from './set-login-credentials/set-login-credentials.component';
import { SignUpSuccessComponent } from './sign-up-success/sign-up-success.component';
import { SuccessComponent } from './success/success.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MpinComponent } from './ModeOfLogin/mpin/mpin.component';
import { PasswordComponent } from './ModeOfLogin/password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    ChooseLoginMethodComponent,
    LoginSuccessComponent,
    MpinSetupComponent,
    OtpVerificationComponent,
    RoleDetailsComponent,
    SetLoginCredentialsComponent,
    SignUpSuccessComponent,
    SuccessComponent,
    WelcomeComponent,
    MpinComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
