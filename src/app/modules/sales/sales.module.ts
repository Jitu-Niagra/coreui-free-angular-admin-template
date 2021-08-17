import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SalesRoutingModule } from "./sales-routing.module";
import { AllSalesComponent } from "./components/all-sales/all-sales.component";
import { CreateSaleComponent } from "./components/create-sale/create-sale.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SaleDetailsComponent } from "./components/sale-details/sale-details.component";
import { SaleReceiptComponent } from "./components/sale-receipt/sale-receipt.component";
import { SummarySalesComponent } from "./components/summary-sales/summary-sales.component";
import { ChartsModule } from "ng2-charts";

@NgModule({
  declarations: [
    AllSalesComponent,
    CreateSaleComponent,
    SaleDetailsComponent,
    SaleReceiptComponent,
    SummarySalesComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ChartsModule,
  ],
})
export class SalesModule {}
