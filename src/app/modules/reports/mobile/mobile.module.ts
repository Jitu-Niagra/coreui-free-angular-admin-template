import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MobileRoutingModule } from "./mobile-routing.module";
import { MobileReportComponent } from "./componets/mobile-report/mobile-report.component";
import { FormsModule } from "@angular/forms";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [MobileReportComponent],
  imports: [CommonModule, MobileRoutingModule, FormsModule, ChartsModule],
})
export class MobileModule {}
