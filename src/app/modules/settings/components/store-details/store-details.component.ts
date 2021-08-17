import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { SettingsService } from "../../service/settings.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-store-details",
  templateUrl: "./store-details.component.html",
  styleUrls: ["./store-details.component.scss"],
})
export class StoreDetailsComponent implements OnInit, OnDestroy {
  isLoaded: boolean;
  organization: any;
  subscription = new Subscription();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getParams();
  }
  ngOnDestroy() {}
  getParams(): void {
    const orgId = this.route.snapshot.params.id;
    this.getOrganization(orgId);
  }

  getOrganization(id): void {
    this.subscription.add(
      this.settingsService.getOrganization(id).subscribe({
        next: (res) => {
          this.organization = res.result;
          this.isLoaded = true;
          console.log("success");
        },
      })
    );
  }

  editStore(org) {
    this.router.navigate([`/settings/${org._id}/edit`]);
  }
  deleteStore(org) {
    this.subscription.add(
      this.settingsService.deleteOrganization(org._id).subscribe({
        next: (res) => {
          console.log(res);
          this.location.back();
        },
      })
    );
  }
}
