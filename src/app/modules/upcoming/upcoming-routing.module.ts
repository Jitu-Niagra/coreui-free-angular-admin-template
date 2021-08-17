import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddFeatureComponent } from "./components/add-feature/add-feature.component";
import { FeatureComponent } from "./components/feature/feature.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "feature",
    pathMatch: "full",
  },
  {
    path: "feature",
    component: FeatureComponent,
    data: {
      title: "Upcoming features",
    },
  },
  {
    path: "add",
    component: AddFeatureComponent,
    data: {
      title: "Add feature",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpcomingRoutingModule {}
