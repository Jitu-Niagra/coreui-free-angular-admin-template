import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthType } from "../../../shared/models/authType.enum";
import { AuthService } from "../../services/auth.service";

export enum userMessageType {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  // TODO: Clean up UI - @Mary

  loginOrGenerateOtp: Boolean;
  formFields = {
    email: "",
    password: "",
    repeatPassword: "",
  };
  registrationDetails: {};

  registerForm: FormGroup;
  emailValidatorPattern =
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)" +
    "*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
  userMessage: {
    type: userMessageType;
    message: string;
  };
  passwordMinLength = 6;
  userMessageType = userMessageType;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    this.registerFormFunc();
  }

  registerFormFunc() {
    this.registerForm = this.fb.group(
      {
        username: ["", Validators.required],
        email: [
          "",
          Validators.compose([
            Validators.pattern(this.emailValidatorPattern),
            Validators.minLength(3),
            Validators.maxLength(600),
          ]),
        ],
        password: [
          "",
          Validators.compose([
            Validators.required,
            Validators.minLength(this.passwordMinLength),
            Validators.maxLength(75),
          ]),
        ],
        passwordRepeat: ["", Validators.compose([Validators.required])],
      },
      {
        validator: this.mustMatch("password", "passwordRepeat"),
      }
    );
  }

  mustMatch(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  get username() {
    return this.registerForm.get("username");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }
  get passwordRepeat() {
    return this.registerForm.get("passwordRepeat");
  }

  submitRegisterDetails() {
    const userDetails: { username: string; email: string; password: string } =
      this.registerForm.value;

    this.authService
      .register(
        userDetails.username,
        userDetails.email,
        userDetails.password,
        AuthType.USERNAME
      )
      .subscribe(
        (res) => {
          // tslint:disable-next-line: max-line-length
          // console.error('This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a system feature or \'hack\' someone\'s account, it is a scam and will give them access to your account.');
          this.userMessage = {
            type: userMessageType.SUCCESS,
            message:
              "You have registered successfully. A link was sent to your email to verify your account.",
          };
          this.registerForm.reset();
          this.router.navigate(["/auth/login"]);
        },
        (err) => {
          console.log(err);
          this.userMessage = {
            type: userMessageType.ERROR,
            message:
              err.error.statusCode === 400
                ? err.error.message
                : "There was an issue when try to register you. Please try again",
          };
          this.registerForm.reset();
        }
      );
  }

  getOTP() {
    const generateOtpObject = this.registerForm.value;
    console.log("generateOtpObject" + JSON.stringify(generateOtpObject));
    this.authService
      .generateOTP(generateOtpObject.email, AuthType.EMAIL)
      .subscribe(
        (res) => {
          console.log("do other things");
        },
        (err) => {}
      );
  }

  goBack(): void {
    this.location.back();
  }
}
