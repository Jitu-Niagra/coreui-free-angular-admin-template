import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { IOrganization } from "../../models/organization.model";
import { IOrgType } from "../../models/orgTypes.model";
import { OrganizationService } from "../../service/organization.service";

@Component({
  selector: "app-create-organization",
  templateUrl: "./create-organization.component.html",
  styleUrls: ["./create-organization.component.scss"],
})
export class CreateOrganizationComponent implements OnInit {
  orgTypes: IOrgType[] = [];
  organizations: IOrganization[] = [];
  orgForm = new FormGroup({
    name: new FormControl(""),
    orgType: new FormControl(""),
    description: new FormControl(""),
  });
  isSubmitting = false;
  errorMessage = "";
  constructor(
    private orgService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOrganizations();
    this.getOrgType();
  }
  getOrgType() {
    this.orgService.getOrganizationTypes().subscribe((res) => {
      this.orgTypes = res.result;
      console.log(this.orgTypes);
    });
  }
  getOrganizations() {
    this.orgService.getOrganizations().subscribe((res) => {
      this.organizations = res.result;
      console.log(this.organizations);
    });
  }
  onSubmit(formValue: IOrganization) {
    this.isSubmitting = true;
    this.orgService.createOrganization(formValue).subscribe(
      (res) => {
        this.router.navigate(["/organization/select"]);
      },
      (err) => {
        this.isSubmitting = false;
        this.errorMessage = "Couldn't add the new organization.";
        console.log(err);
      }
    );
  }
}
