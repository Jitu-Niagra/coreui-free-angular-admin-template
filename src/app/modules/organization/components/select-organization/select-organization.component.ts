import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { IOrganization } from "../../models/organization.model";
import { OrganizationService } from "../../service/organization.service";

@Component({
  selector: "app-select-organization",
  templateUrl: "./select-organization.component.html",
  styleUrls: ["./select-organization.component.scss"],
})
export class SelectOrganizationComponent implements OnInit {
  organizations: IOrganization[] = [];
  userRole = localStorage.getItem("role");
  currentOrganization: { _id?: string; name: string } = { _id: "", name: "" };
  isLoaded = true;
  subscription = new Subscription();
  constructor(
    private orgService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentOrganization();
    this.getOrganizations();
  }

  ngOnDestroy(): void {}

  getOrganizations() {
    console.log(this.userRole);
    if (this.userRole === "SYSADMIN") {
      this.orgService.getAllOrganizations().subscribe((res) => {
        this.organizations = res.result;
        console.log(this.organizations);
        this.isLoaded = false;
      });
    } else {
      this.orgService.getOrganizations().subscribe((res) => {
        this.organizations = res.result;
        console.log(this.organizations);
        this.isLoaded = false;
      });
    }
  }
  createStore() {
    this.router.navigate(["/organization/create"]);
  }

  switchToOrganization(org_id: string) {
    console.log(org_id);
    // if (this.userRole === "SYSADMIN")
    this.orgService.setCurrentOrganization(org_id).subscribe((res) => {
      this.router.navigate([`pos/items`]);
      console.log(res);
      console.log("Success fully set  current store");
    });
  }

  getCurrentOrganization(): void {
    this.subscription.add(
      this.orgService.getCurrentOrganization().subscribe((res) => {
        this.currentOrganization = res.result.organization;
        console.log(this.currentOrganization);
      })
    );
  }
}
