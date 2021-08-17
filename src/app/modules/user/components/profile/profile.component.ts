import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { UserService } from "../../service/user.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit, OnDestroy {
  User: {
    _id?: string;
    username?: string;
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
  subscription = new Subscription();
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUserProfile();
  }
  ngOnDestroy(): void {
    this.subscription.remove;
  }
  getUserProfile() {
    this.subscription.add(
      this.userService.getUserProfile().subscribe((res) => {
        console.log(res);
        this.User = res.result;
        console.log("User");
      })
    );
  }

  editProfile(user) {
    console.log(user);
    this.router.navigate([`/user/${user._id}/edit`]);
  }
}
