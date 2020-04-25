import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

// import { AuthComponent } from './auth.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent , data: {title: 'Login'}},
  { path: 'register', component: RegisterComponent , data: {title: 'Register'}},
  { path: 'forgot-password', component: ForgotPasswordComponent , data: {title: 'Forgot Password'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
