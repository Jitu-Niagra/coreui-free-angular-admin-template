import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllSalesComponent } from "./components/all-sales/all-sales.component";
import { CreateSaleComponent } from "./components/create-sale/create-sale.component";
import { SaleDetailsComponent } from "./components/sale-details/sale-details.component";
import { SaleReceiptComponent } from "./components/sale-receipt/sale-receipt.component";
import { SummarySalesComponent } from "./components/summary-sales/summary-sales.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "all-sales",
    pathMatch: "full",
  },

  {
    path: "sales-summary",
    component: SummarySalesComponent,
    data: {
      title: "Dashboard",
    },
  },
  {
    path: "all-sales",
    component: AllSalesComponent,
    data: {
      title: "All Sales",
    },
  },
  {
    path: "create-sale",
    component: CreateSaleComponent,
    data: {
      title: "Create Sale",
    },
  },
  {
    path: "transaction/:id/details",
    component: SaleDetailsComponent,
    data: {
      title: "Transaction Details",
    },
  },
  {
    path: "transaction/:id/receipt",
    component: SaleReceiptComponent,
    data: {
      title: "Transaction receipt",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesRoutingModule {}
