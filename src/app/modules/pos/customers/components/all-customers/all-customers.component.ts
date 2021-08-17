import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CustomersService } from "../../service/customers.service";
import { ICustomer } from "../../shared/customer.model";

@Component({
  selector: "app-all-customers",
  templateUrl: "./all-customers.component.html",
  styleUrls: ["./all-customers.component.scss"],
})
export class AllCustomersComponent implements OnInit {
  customers: ICustomer[] = [];
  customerSearch: any;
  constructor(
    private router: Router,
    private customersService: CustomersService
  ) {}
  isLoaded: boolean;
  ngOnInit(): void {
    this.isLoaded = false;
    this.getCustomers();
  }

  getCustomers() {
    this.customersService.getCustomers().subscribe((res) => {
      this.customers = res.result;
      this.isLoaded = true;
      console.log(this.customers);
    });
  }
  addCustomer() {
    this.router.navigate([`pos/customers/add`]);
  }
  viewCustomer(customer) {
    console.log(customer);
    this.customersService.getCustomer(customer._id).subscribe((res) => {
      console.log(res);
      this.router.navigate([`pos/customers/${customer._id}/details`]);
    });
  }
}
