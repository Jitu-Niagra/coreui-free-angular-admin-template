import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Form,
  FormControl,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { CustomersService } from "../../../pos/customers/service/customers.service";
import { ICustomer } from "../../../pos/customers/shared/customer.model";
import { ItemsService } from "../../../pos/items/service/items.service";
import { IItems } from "../../../pos/items/shared/item.model";
import { SalesService } from "../../service/sales.service";
import { ISale } from "../../models/sales.model";

@Component({
  selector: "app-create-sale",
  templateUrl: "./create-sale.component.html",
  styleUrls: ["./create-sale.component.scss"],
})
export class CreateSaleComponent implements OnInit, OnDestroy {
  items: IItems[] = [];
  itemSearch: any;
  itemsIsSelected: boolean;
  transaction: any;
  isLoaded: boolean;
  selectedItems: [
    {
      _id: string;
      name: string;
      quantity: number;
      price: number;
      totalItems?: number;
    }
  ] = [
    {
      _id: " ",
      name: " ",
      quantity: 0,
      price: 0,
      totalItems: 0,
    },
  ];
  sale: ISale = {
    _id: "",
    paymentTerm: "",
    items: [
      {
        _id: " ",
        name: " ",
        quantity: 0,
        price: 0,
        totalItems: 0,
      },
    ],
    total: 0,
    customer: [""],
  };

  totalPayment: any;
  payMethod: string = "";
  customers: ICustomer[] = [];
  customersForm: FormGroup = this.fb.group({
    customers: this.fb.array([]),
  });
  customersAdded: any;
  subscription = new Subscription();
  addedCustomers: boolean;
  isTransactionComplete: boolean;

  constructor(
    private itemsService: ItemsService,
    private salesService: SalesService,
    private customersService: CustomersService,
    private fb: FormBuilder,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.itemsIsSelected = false;
    this.isLoaded = false;
    this.selectedItems.shift();
    this.getItems();
    this.getCustomers();
    this.addedCustomers = false;
    this.isTransactionComplete = false;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  getItems() {
    this.subscription.add(
      this.itemsService.getItems().subscribe({
        next: (res) => {
          this.items = res.result;
          this.isLoaded = true;
          console.log(this.items);
        },
      })
    );
  }

  addItem(item) {
    this.itemsIsSelected = true;
    console.log(item._id);
    const itemIndex = this.selectedItems.findIndex((x) => x._id === item._id);
    console.log(this.selectedItems);
    if (itemIndex !== -1) {
      const itemToUpdate = {
        ...this.selectedItems[itemIndex],
      };
      this.selectedItems.splice(itemIndex, 1, itemToUpdate);
      itemToUpdate.totalItems += 1;
      console.log("To add 1");
    } else {
      this.selectedItems.push(item);
      const itemIndex = this.selectedItems.findIndex((x) => x._id === item._id);
      this.selectedItems[itemIndex].totalItems = 1;
      console.log("To push");
    }

    this.totalPayment = this.selectedItems
      .map((item) => item)
      .reduce(function (accumulator, item) {
        return accumulator + item.price * item.totalItems;
      }, 0);
    console.log(this.totalPayment);
  }

  paymentMethod(value) {
    console.log(value);
    this.payMethod = value;
  }

  getCustomers() {
    this.subscription.add(
      this.customersService.getCustomers().subscribe({
        next: (res) => {
          this.customers = res.result;
          console.log(this.customers);
        },
      })
    );
  }
  showCustomers() {
    this.addedCustomers = true;
  }
  addCustomers(form) {
    console.log(form.value);
    this.customersAdded = form.value.customers;
    this.addedCustomers = false;
    console.log(this.customersAdded);
  }

  onChange(e) {
    const customers = this.customersForm.get("customers") as FormArray;
    if (e.target.checked) {
      customers.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      customers.controls.forEach((customer: FormControl) => {
        if (customer.value == e.target.value) {
          customers.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  viewTransaction() {
    this.sale = {
      paymentTerm: this.payMethod,
      items: this.selectedItems,
      customer: this.customersAdded,
      total: this.totalPayment,
    };
    console.log(this.sale);
    this.isTransactionComplete = true;
  }
  completeTransaction() {
    this.salesService.createTransaction(this.sale).subscribe({
      next: (res) => {
        console.log(res);
        this.isTransactionComplete = true;
        this.transaction = res;
        this.router.navigate([
          `/reports/transaction/${this.transaction.result._id}/details`,
        ]);
      },
    });
  }
  removeItem(item) {
    this.itemsIsSelected = true;
    console.log(item._id);
    const itemIndex = this.selectedItems.findIndex((x) => x._id === item._id);
    console.log(this.selectedItems);
    if (itemIndex !== -1) {
      const itemToUpdate = {
        ...this.selectedItems[itemIndex],
      };
      this.selectedItems.splice(itemIndex, 1, itemToUpdate);
      itemToUpdate.totalItems -= 1;
      console.log("To add 1");
    }
  }

  reduceItem(item) {
    item.totalItems -= 1;
  }
  plusItem(item) {
    item.totalItems += 1;
  }
  back() {
    this.location.back();
  }
}
