import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateOrganizationComponent } from "./components/create-organization/create-organization.component";
import { SelectOrganizationComponent } from "./components/select-organization/select-organization.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "select",
    pathMatch: "full",
  },
  {
    path: "select",
    component: SelectOrganizationComponent,
  },
  {
    path: "create",
    component: CreateOrganizationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule {}
