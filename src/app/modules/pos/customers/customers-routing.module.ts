import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllCustomersComponent } from "./components/all-customers/all-customers.component";
import { CustomerDetailsComponent } from "./components/customer-details/customer-details.component";
import { EditCustomerComponent } from "./components/edit-customer/edit-customer.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "all-customers",
    pathMatch: "full",
  },
  {
    path: "all-customers",
    component: AllCustomersComponent,
    data: {
      title: "Add   a customer",
    },
  },
  {
    path: "add",
    component: EditCustomerComponent,
    data: {
      title: "Add   a customer",
    },
  },
  {
    path: ":id/edit",
    component: EditCustomerComponent,
    data: {
      title: "Edit a customer",
    },
  },
  {
    path: ":id/details",
    component: CustomerDetailsComponent,
    data: {
      title: "Customer Details",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
