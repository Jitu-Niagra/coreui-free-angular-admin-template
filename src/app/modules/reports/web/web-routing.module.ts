import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WebReportComponent } from "./component/web-report/web-report.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "reports",
    pathMatch: "full",
  },
  {
    path: "reports",
    component: WebReportComponent,
    data: {
      title: "Report",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {}
