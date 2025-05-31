import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';
import { SuccessComponent } from './success/success.component';
import { ChooseLoginMethodComponent } from './choose-login-method/choose-login-method.component';
import { LoginSuccessComponent } from './login-success/login-success.component';
import { MpinSetupComponent } from './mpin-setup/mpin-setup.component';
import { SetLoginCredentialsComponent } from './set-login-credentials/set-login-credentials.component';
import { SignUpSuccessComponent } from './sign-up-success/sign-up-success.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { RouterModule, Routes } from '@angular/router';
import { MpinComponent } from './ModeOfLogin/mpin/mpin.component';
import { PasswordComponent } from './ModeOfLogin/password/password.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'roleDetails', component: RoleDetailsComponent },
  { path: 'generateOTP', component: OtpVerificationComponent },
  { path: 'signUpSuccess', component: SignUpSuccessComponent },
  { path: 'setUpAccount', component: SetLoginCredentialsComponent },
  { path: 'mpinSetup', component: MpinSetupComponent },
  { path: 'loginSuccess', component: LoginSuccessComponent },
  { path: 'chooseLoginMethod', component: ChooseLoginMethodComponent },
  { path: 'mpin', component: MpinComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'success', component: SuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
