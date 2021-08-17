import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IFeature } from "../../model/feature.model";
import { UpcomingService } from "../../service/upcoming.service";

@Component({
  selector: "app-feature",
  templateUrl: "./feature.component.html",
  styleUrls: ["./feature.component.scss"],
})
export class FeatureComponent implements OnInit {
  features: IFeature[] = [];
  isAdmin: boolean = false;
  isLoading: boolean = false;

  constructor(
    private upcomingService: UpcomingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const role = localStorage.getItem("role");
    this.getUpcomingEvents();
    if (role === "SYSADMIN") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  getUpcomingEvents() {
    this.upcomingService.getUpcomingEvents().subscribe({
      next: (res) => {
        this.features = res.result;
        this.isLoading = true;
        console.log(this.features);
      },
    });
  }

  addEvent() {
    this.router.navigate(["/upcoming/add"]);
  }
}
