import { Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../../service/user.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.scss"],
})
export class EditUserComponent implements OnInit, OnDestroy {
  userForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    firstname: new FormControl(""),
    lastname: new FormControl(""),
    countryCode: new FormControl(""),
  });

  subscription = new Subscription();
  userEdit: {
    _id?: string;
    username: string;
    firstname?: string;
    lastname?: string;
    countryCode?: string;
    emails: [];
  } = {
    _id: "",
    username: "",
    firstname: "",
    lastname: "",
    countryCode: "",
    emails: [],
  };
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUserDetails() {
    this.subscription.add(
      this.userService.getUserProfile().subscribe((res) => {
        this.userEdit = res.result;
        console.log(this.userEdit);

        this.userForm.setValue({
          username: this.userEdit.username ? this.userEdit.username : "",
          firstname: this.userEdit.firstname ? this.userEdit.firstname : "",
          lastname: this.userEdit.lastname ? this.userEdit.lastname : "",
          countryCode: this.userEdit.countryCode
            ? this.userEdit.countryCode
            : "",
        });
      })
    );
  }

  back() {
    this.location.back();
  }

  submitForm(userForm) {
    console.log(userForm);
    this.userService.updateProfile(userForm.value).subscribe({
      next: (res) => {
        this.location.back();
      },
    });
  }
}
