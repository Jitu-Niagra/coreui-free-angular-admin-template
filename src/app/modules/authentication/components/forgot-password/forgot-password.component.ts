import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  forgotForm: FormGroup;
  forgotPassword: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.forgotPassword = false;
    this.formFields();
  }
  formFields() {
    this.forgotForm = new FormGroup({
      email: new FormControl("", Validators.required),
    });
  }
  submitForgotDetails(formDetails: any) {
    console.log(formDetails.value);
    this.authService.forgotPasswordEmail(formDetails.value).subscribe((res) => {
      console.log(res);
      this.forgotPassword = true;
    });
  }

  get email() {
    return this.forgotForm.get("email");
  }
}
