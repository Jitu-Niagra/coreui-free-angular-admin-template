import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SettingsRoutingModule } from "./settings-routing.module";
import { AddStoreComponent } from "./components/add-store/add-store.component";
import { ManageOrganizationsComponent } from "./components/manage-organizations/manage-organizations.component";
import { StoreDetailsComponent } from "./components/store-details/store-details.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [
    AddStoreComponent,
    ManageOrganizationsComponent,
    StoreDetailsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
})
export class SettingsModule {}
