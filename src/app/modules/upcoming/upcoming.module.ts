import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UpcomingRoutingModule } from "./upcoming-routing.module";
import { AddFeatureComponent } from "./components/add-feature/add-feature.component";
import { FeatureComponent } from "./components/feature/feature.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddFeatureComponent, FeatureComponent],
  imports: [
    CommonModule,
    UpcomingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UpcomingModule {}
