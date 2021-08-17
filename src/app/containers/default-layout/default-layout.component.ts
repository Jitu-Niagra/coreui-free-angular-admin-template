import { Component } from "@angular/core";
import { navItems } from "../../_nav";
import { OrganizationService } from "./../../modules/organization/service/organization.service";
import { AuthService } from "./../../modules/authentication/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  currentOrganization: {};

  constructor(
    private orgService: OrganizationService,
    private authService: AuthService
  ) {}
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  getCurrentOrganization() {
    this.orgService.getCurrentOrganization().subscribe((res) => {
      console.log(res);
      this.currentOrganization = res.result.organization.name;
    });
  }
  logout() {
    this.authService.logout();
  }
  back() {
    // this.location.back();
  }
}
