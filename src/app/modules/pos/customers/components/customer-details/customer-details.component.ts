import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CustomersService } from "../../service/customers.service";
import { ICustomer } from "../../shared/customer.model";

@Component({
  selector: "app-customer-details",
  templateUrl: "./customer-details.component.html",
  styleUrls: ["./customer-details.component.scss"],
})
export class CustomerDetailsComponent implements OnInit {
  isLoaded: boolean;
  customerDetails: ICustomer = {
    _id: "",
    name: "",
    email: "",
    phoneNumber: null,
    address: "",
    city: "",
    region: "",
    postCode: null,
    country: "",
    transactions: [],
  };
  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoaded = false;
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    const customerId = this.route.snapshot.paramMap.get("id");
    console.log(customerId);
    this.customersService.getCustomer(customerId).subscribe((res) => {
      console.log(res);
      this.customerDetails = res.result;
      this.isLoaded = true;
    });
  }
  editCustomer(customerId) {
    this.router.navigate([`pos/customers/${customerId}/edit`]);
  }
  deleteCustomer(customerId) {
    this.customersService.deleteCustomer(customerId).subscribe((res) => {
      this.router.navigate(["pos/customers"]);
    });
  }

  back() {
    this.router.navigate([`pos/customers`]);
  }
}
