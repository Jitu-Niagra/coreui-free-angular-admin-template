import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomersRoutingModule } from "./customers-routing.module";
import { EditCustomerComponent } from "./components/edit-customer/edit-customer.component";
import { CustomerDetailsComponent } from "./components/customer-details/customer-details.component";
import { AllCustomersComponent } from "./components/all-customers/all-customers.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Ng2SearchPipeModule } from "ng2-search-filter";

@NgModule({
  declarations: [
    EditCustomerComponent,
    CustomerDetailsComponent,
    AllCustomersComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
})
export class CustomersModule {}
