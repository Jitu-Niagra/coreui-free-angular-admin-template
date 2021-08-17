import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailValidatorPattern =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)" +
    "*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  errorMessage: {
    title: string;
    message: string;
  };
  registeredSuccessfullyMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      const redirectUrl = this.authService.redirectUrl || "/organization";
      this.router.navigateByUrl(redirectUrl);
    }
  }

  ngOnInit(): void {
    if (this.authService.registeredSuccessfully) {
      this.registeredSuccessfullyMessage = `You have being successfully registered, please login in with your credentials.`;
    }
    this.LoginFormFunc();
  }

  LoginFormFunc(): void {
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  // Get form field to validator form with
  get username() {
    return this.loginForm.get("username");
  }
  get password() {
    return this.loginForm.get("password");
  }

  submitLoginDetails(): void {
    this.registeredSuccessfullyMessage = undefined;
    const userDetails = this.loginForm.value;
    this.authService
      .login(userDetails.username, userDetails.password)
      .subscribe({
        next: () => {
          this.errorMessage = undefined;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = {
            title: "We couldn't sign you in.",
            message: err.error.message,
          };
        },
      });
  }
}
