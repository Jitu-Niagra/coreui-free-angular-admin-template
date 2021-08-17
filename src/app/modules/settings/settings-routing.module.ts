import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddStoreComponent } from "./components/add-store/add-store.component";
import { ManageOrganizationsComponent } from "./components/manage-organizations/manage-organizations.component";
import { StoreDetailsComponent } from "./components/store-details/store-details.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "manage",
    pathMatch: "full",
  },
  {
    path: "manage",
    component: ManageOrganizationsComponent,
    data: {
      title: "Manage your stores",
    },
  },
  {
    path: "add",
    component: AddStoreComponent,
    data: {
      title: "Add a new  store",
    },
  },
  {
    path: ":id/details",
    component: StoreDetailsComponent,
    data: {
      title: "Store Details",
    },
  },
  {
    path: ":id/edit",
    component: AddStoreComponent,
    data: {
      title: "Edit Store",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
