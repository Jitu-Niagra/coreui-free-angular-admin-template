import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WebRoutingModule } from "./web-routing.module";
import { WebReportComponent } from "./component/web-report/web-report.component";

@NgModule({
  declarations: [WebReportComponent],
  imports: [CommonModule, WebRoutingModule],
})
export class WebModule {}
