import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { IOrgType } from "../../../organization/models/orgTypes.model";
import { SettingsService } from "../../service/settings.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-add-store",
  templateUrl: "./add-store.component.html",
  styleUrls: ["./add-store.component.scss"],
})
export class AddStoreComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  orgTypes: IOrgType[] = [];
  orgEdit: any;

  orgForm: FormGroup = new FormGroup({
    name: new FormControl(),
    orgType: new FormControl(),
    description: new FormControl(),
  });
  isEdit: boolean;
  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isEdit = false;
    this.getOrgTypes();
    this.getParams();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  upDateForm(): void {
    this.orgForm.patchValue({
      name: this.orgEdit.name,
      orgType: this.orgEdit.orgType.name,
      description: this.orgEdit.description,
    });
  }

  getParams() {
    const org_Id = this.route.snapshot.params.id;
    if (org_Id) {
      this.isEdit = true;
      this.getOrgDetails(org_Id);
    } else {
      this.isEdit = false;
    }
  }

  getOrgTypes(): void {
    this.subscription.add(
      this.settingsService.getOrganizationTypes().subscribe({
        next: (res) => {
          this.orgTypes = res.result;
        },
      })
    );
  }
  onSubmit(org) {
    this.subscription.add(
      this.settingsService.createOrganization(org).subscribe({
        next: (res) => {
          console.log(res);
        },
      })
    );
  }
  onEdit(org) {
    const orgId = this.route.snapshot.params.id;
    this.subscription.add(
      this.settingsService.editOrganization(org, orgId).subscribe((res) => {
        console.log("edit");
        this.location.back();
      })
    );
  }
  getOrgDetails(orgId): void {
    this.subscription.add(
      this.settingsService
        .getOrganization(orgId)
        .pipe(first())
        .subscribe({
          next: (res) => {
            this.orgEdit = res.result;
            console.log(this.orgEdit);
            this.upDateForm();
          },
        })
    );
  }
}
