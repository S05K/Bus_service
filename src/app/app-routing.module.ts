import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { OtpComponent } from './otp/otp.component';

const routes: Routes = [
  {path: 'forgot', component: ForgotComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent, canActivate: [AuthGuard]},
  {path: 'otp', component: OtpComponent},
  {path:'', component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
