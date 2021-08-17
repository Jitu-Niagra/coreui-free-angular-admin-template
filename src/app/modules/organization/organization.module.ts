import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OrganizationRoutingModule } from "./organization-routing.module";
import { SelectOrganizationComponent } from "./components/select-organization/select-organization.component";
import { CreateOrganizationComponent } from "./components/create-organization/create-organization.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SelectOrganizationComponent, CreateOrganizationComponent],
  imports: [
    CommonModule,
    OrganizationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class OrganizationModule {}
