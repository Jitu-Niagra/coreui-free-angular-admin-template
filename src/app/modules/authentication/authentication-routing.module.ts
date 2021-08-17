import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetComponent } from "./components/reset/reset.component";
import { VerifyAccountComponent } from "./components/verify-account/verify-account.component";
import { VerifyEmailComponent } from "./components/verify-email/verify-email.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "resetPassword",
    component: ResetComponent,
  },
  {
    path: "forgotPassword",
    component: ForgotPasswordComponent,
  },
  {
    path: "verifyEmail",
    component: VerifyEmailComponent,
  },
  {
    path: "verifyAccount",
    component: VerifyAccountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
