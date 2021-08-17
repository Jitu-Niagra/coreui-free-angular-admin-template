import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MobileReportComponent } from "./componets/mobile-report/mobile-report.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "summary-report",
    pathMatch: "full",
  },
  {
    path: "summary-report",
    component: MobileReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class MobileRoutingModule {}
