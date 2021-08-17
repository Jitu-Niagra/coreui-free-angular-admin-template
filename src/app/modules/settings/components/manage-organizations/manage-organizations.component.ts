import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IOrganization } from "../../../organization/models/organization.model";
import { SettingsService } from "../../service/settings.service";

@Component({
  selector: "app-manage-organizations",
  templateUrl: "./manage-organizations.component.html",
  styleUrls: ["./manage-organizations.component.scss"],
})
export class ManageOrganizationsComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  organizations: IOrganization[] = [];
  isLoaded: boolean;
  storeSearch: any;
  constructor(
    private settingService: SettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getOrganizations();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  getOrganizations(): void {
    this.subscription.add(
      this.settingService.getOrganizations().subscribe({
        next: (res) => {
          this.isLoaded = true;
          this.organizations = res.result;
          console.log(this.organizations);
        },
      })
    );
  }

  editStore(org) {
    this.router.navigate([`/settings/${org._id}/edit`]);
  }
  addStore() {
    this.router.navigate([`/settings/add`]);
  }
  viewStore(orgId) {
    this.router.navigate([`/settings/${orgId}/details`]);
  }
}
