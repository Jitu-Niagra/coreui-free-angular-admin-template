import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { CustomersService } from "../../service/customers.service";
import { Countries } from "../../shared/countries.const";
import { ICustomer } from "../../shared/customer.model";

@Component({
  selector: "app-edit-customer",
  templateUrl: "./edit-customer.component.html",
  styleUrls: ["./edit-customer.component.scss"],
})
export class EditCustomerComponent implements OnInit {
  customerForm: FormGroup;
  isEdit: boolean = false;
  customerEdit: ICustomer = {
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
  countries: { name: string; dial_code: string; code: string }[] = Countries;
  constructor(
    private customersService: CustomersService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.customerDetails();
    this.getParams();
  }
  customerDetails() {
    this.customerForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      phoneNumber: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      region: new FormControl(),
      postCode: new FormControl(),
      country: new FormControl(),
    });
  }
  get name() {
    return this.customerForm.get("name");
  }
  get phoneNumber() {
    return this.customerForm.get("phoneNumber");
  }
  get address() {
    return this.customerForm.get("address");
  }
  get city() {
    return this.customerForm.get("city");
  }
  get region() {
    return this.customerForm.get("region");
  }
  get email() {
    return this.customerForm.get("email");
  }

  addCustomer(customerDetail) {
    console.log(customerDetail.value);
    this.customersService
      .addCustomers(customerDetail.value)
      .subscribe((res) => {
        console.log(res.result);
        this.router.navigate(["pos/customers"]);
      });
  }

  getParams() {
    const customerId = this.route.snapshot.paramMap.get("id");

    if (customerId) {
      this.customersService.getCustomer(customerId).subscribe((res) => {
        this.customerEdit = res.result;
        console.log(this.customerEdit);
        this.setFormValue();
        this.isEdit = true;
      });
    }
  }
  setFormValue() {
    this.customerForm.patchValue({
      name: this.customerEdit.name,
      email: this.customerEdit.email,
      phoneNumber: this.customerEdit.phoneNumber,
      address: this.customerEdit.address,
      city: this.customerEdit.city,
      region: this.customerEdit.region,
      postCode: this.customerEdit.postCode,
      country: this.customerEdit.country,
    });
    this.isEdit = true;
  }
  editCustomer(form) {
    console.log(form.value);
    this.customersService
      .updateCustomer(this.customerEdit._id, form.value)
      .subscribe((res) => {
        console.log(res);
        this.location.back();
      });
  }
}
